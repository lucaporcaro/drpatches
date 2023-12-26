import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import JwtGaurd from './gaurd/jwt.gaurd';

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
  providers: [AuthenticationService, JwtGaurd],
  controllers: [AuthenticationController],
  exports: [JwtGaurd],
})
export class AuthenticationModule {}
