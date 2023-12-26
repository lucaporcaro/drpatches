import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from '../user/entities/user.entity';
import Address from './entities/address.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User, Address],
    }),
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
