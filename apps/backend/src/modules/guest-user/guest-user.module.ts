import { Module } from '@nestjs/common';
import { GuestUserService } from './guest-user.service';
import { GuestUserController } from './guest-user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from 'src/modules/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [User] }),
    JwtModule.register({
      global: true,
      secret: 'Vbpx:6]H^.;a!2Mue[&{4<kh8~Ym)GsEd#,f',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [GuestUserController],
  providers: [GuestUserService],
})
export class GuestUserModule {}
