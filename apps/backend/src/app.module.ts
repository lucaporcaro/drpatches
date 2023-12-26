import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    AuthenticationModule,
    UserModule,
    AddressesModule,
    ProductModule,
  ],
})
export class AppModule {}
