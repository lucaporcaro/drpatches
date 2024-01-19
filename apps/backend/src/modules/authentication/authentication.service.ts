import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import RegisterRequestDto from './dtos/register.request.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import User from '../user/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import {
  catchError,
  filter,
  from,
  map,
  mergeMap,
  throwError,
  throwIfEmpty,
} from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly user: EntityRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public register({ password, ...payload }: RegisterRequestDto) {
    return from(
      this.user.count({
        $or: [
          { email: payload.email },
          { phone: payload.phone },
          { fiscal: payload.fiscal },
        ],
      }),
    ).pipe(
      filter((count) => count === 0),
      throwIfEmpty(() => {
        throw new BadRequestException(
          'User with this phone, email or fiscal code already exists',
        );
      }),
      mergeMap(() => {
        password = this.hashPassword(password);
        const user = this.user.create({ ...payload, password });
        return from(this.user.getEntityManager().persistAndFlush(user)).pipe(
          map(() => user),
          catchError((e) => throwError(() => e)),
        );
      }),
      mergeMap((user) => {
        return from(
          this.jwtService.signAsync({
            id: user.id,
            email: user.email,
          }),
        );
      }),
      map((token) => ({ token })),
      catchError((e) => throwError(() => e)),
    );
  }

  public login(email: string, password: string) {
    return from(
      this.user.findOne({ email }, { fields: ['password', 'email', 'id'] }),
    ).pipe(
      mergeMap((user) => {
        if (!user || user.password !== this.hashPassword(password))
          throw new UnauthorizedException('User did not found');
        return from(
          this.jwtService.signAsync({ id: user.id, email: user.email }),
        );
      }),
      map((token) => ({ token })),
      catchError((e) => throwError(() => e)),
    );
  }

  private hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
