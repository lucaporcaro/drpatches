import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Product from 'src/modules/product/entities/product.entity';
import Cart from 'src/modules/cart/entities/cart.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product, Cart])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
