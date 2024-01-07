import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  RawBodyRequest,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { config } from 'dotenv';
import Product, {
  ProductStatus,
} from 'src/modules/product/entities/product.entity';
import Stripe from 'stripe';

config();

@Controller('webhooks/stripe')
@ApiTags('Web Hooks')
export class StripeController {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  private readonly ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SIGN_SECRET;
  private em: EntityManager;

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: EntityRepository<Product>,
  ) {
    this.em = productRepo.getEntityManager();
  }

  @Post()
  async handle(@Body() event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const product = await this.productRepo.findOne({
        stripeId: event.data.object.client_reference_id,
      });
      product.status = ProductStatus.PAID;
      await this.em.flush();
    }
  }
}
