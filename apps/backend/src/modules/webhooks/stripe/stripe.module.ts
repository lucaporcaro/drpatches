import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Product from 'src/modules/product/entities/product.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
