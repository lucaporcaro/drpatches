import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import Cart from './entities/cart.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from '../user/entities/user.entity';
import Product from '../product/entities/product.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Cart, User, Product] })],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
