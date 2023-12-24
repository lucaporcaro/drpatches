import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthenticationModule],
})
export class AppModule {}
