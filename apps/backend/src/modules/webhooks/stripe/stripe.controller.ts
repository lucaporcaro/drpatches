import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  RawBodyRequest,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { throws } from 'assert';
import { config } from 'dotenv';
import { from, switchMap } from 'rxjs';
import Cart from 'src/modules/cart/entities/cart.entity';
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
    @InjectRepository(Cart)
    private readonly cartRepo: EntityRepository<Cart>,
  ) {
    this.em = productRepo.getEntityManager();
  }

  @Post()
  async handle(@Body() event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      /*return from(
        this.productRepo.findOne({
          stripeId: event.data.object.client_reference_id,
        }),
      ).pipe(
        switchMap((product) => {
          product.status = ProductStatus.PAID;
          return from(this.em.flush());
        }),
      );*/
      try {
        const cart = await this.cartRepo.findOneOrFail(
          {
            stripeId: event.data.object.client_reference_id,
          },
          { populate: ['products.id', 'products.status'] },
        );
        for (const product of cart.products) {
          product.status = ProductStatus.PAID;
        }
        cart.products.removeAll();
        await this.cartRepo.persistAndFlush(cart);
        await this.em.flush();
      } catch (e) {
        throw new NotFoundException('cart not found');
      }
    }
  }
}
