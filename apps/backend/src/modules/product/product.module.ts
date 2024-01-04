import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PriceService, ProductService } from './services';
import User from '../user/entities/user.entity';
import Product from './entities/product.entity';
import PatchType from './entities/patch-type.entity';
import BackingPrice from './entities/backing-price.entity';
import { PriceController, ProductController } from './controllers';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Product, PatchType, BackingPrice]),
  ],
  providers: [ProductService, PriceService],
  controllers: [ProductController, PriceController],
})
export class ProductModule {}
