import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ProductModule } from './modules/product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from './common/storages/dist';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AdminjsModule, MEDIA_BUCKET } from './common/adminjs/adminjs.module';
import { CacheModule } from '@nestjs/cache-manager';
import { StripeModule } from './modules/webhooks/stripe/stripe.module';
import { FontModule } from './modules/font/font.module';
import { CartModule } from './modules/cart/cart.module';
import { GuestUserModule } from './modules/guest-user/guest-user.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    AdminjsModule,
    MikroOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: MEDIA_BUCKET,
      renderPath: '/static',
    }),
    MulterModule.register({
      storage: diskStorage,
    }),
    AuthenticationModule,
    UserModule,
    AddressesModule,
    ProductModule,
    StripeModule,
    FontModule,
    CartModule,
    GuestUserModule,
  ],
})
export class AppModule {}
