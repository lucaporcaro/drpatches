import { Module } from '@nestjs/common';
import ProductController from './product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from '../user/entities/user.entity';
import Product from './entities/product.entity';
import PatchType from './entities/patch-type.entity';
import ProductService from './product.service';

@Module({
    imports: [
        MikroOrmModule.forFeature([User, Product, PatchType])
    ],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
