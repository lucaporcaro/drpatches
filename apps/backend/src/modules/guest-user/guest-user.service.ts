import { Injectable } from '@nestjs/common';
import { CreateGuestUserDto } from './dto/create-guest-user.dto';
import { UpdateGuestUserDto } from './dto/update-guest-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import User from 'src/modules/user/entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GuestUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create({ fiscal, email, password }: CreateGuestUserDto) {
    const guser = this.userRepo.create({ email, fiscal, password });
    await this.userRepo.persistAndFlush([guser]);
    return {
      token: this.jwtService.sign({ id: guser.id, email: guser.email }),
    };
  }
}
