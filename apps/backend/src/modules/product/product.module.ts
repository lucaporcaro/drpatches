import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PriceService, ProductService } from './services';
import User from '../user/entities/user.entity';
import Product from './entities/product.entity';
import PatchType from './entities/patch-type.entity';
import BackingPrice from './entities/backing-price.entity';
import { PriceController, ProductController } from './controllers';
import PatchTypeService from './services/patch-type.service';
import PatchTypeController from './controllers/patch-type.controller';
import Font from '../font/entities/font.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Product, PatchType, BackingPrice, Font]),
  ],
  providers: [ProductService, PriceService, PatchTypeService],
  controllers: [ProductController, PriceController, PatchTypeController],
})
export class ProductModule {}
