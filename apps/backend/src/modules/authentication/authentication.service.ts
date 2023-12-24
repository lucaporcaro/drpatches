import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import RegisterRequestDto from './dtos/register.request.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import User from '../user/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly user: EntityRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async register({ password, ...payload }: RegisterRequestDto) {
    if (
      await this.user.count({
        phone: payload.phone,
        $or: [
          {
            email: payload.email,
          },
        ],
      })
    )
      throw new BadRequestException(
        'User with this phone or email already exists',
      );
    password = this.hashPassword(password);
    const user = this.user.create({ ...payload, password });

    await this.user.getEntityManager().persistAndFlush(user);
    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }

  public async login(email: string, password: string) {
    const user = await this.user.findOne(
      { email },
      { fields: ['password', 'email', 'id'] },
    );
    if (!user || user.password !== this.hashPassword(password))
      throw new UnauthorizedException('User did not found');

    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }

  private hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
