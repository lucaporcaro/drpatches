import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import Cart from './entities/cart.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  //imports: [MikroOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
