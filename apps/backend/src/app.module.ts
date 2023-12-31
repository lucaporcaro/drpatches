import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ProductModule } from './modules/product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from './common/storages/dist';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.dir(join(__dirname, 'media'));

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'media'),
      renderPath: '/static',
    }),
    MulterModule.register({
      storage: diskStorage,
    }),
    AuthenticationModule,
    UserModule,
    AddressesModule,
    ProductModule,
  ],
})
export class AppModule {}
