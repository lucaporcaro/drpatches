import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { catchError, from, map, mergeMap, throwError } from 'rxjs';
import User from 'src/modules/user/entities/user.entity';

@Injectable()
export default class JwtGaurd implements CanActivate {
  private readonly logger = new Logger(JwtGaurd.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {}

  public canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    return from(this.jwtService.verifyAsync(token)).pipe(
      mergeMap(({ id }) => from(this.userRepo.findOneOrFail({ id }))),
      map((user) => {
        request.user = user;
        return true;
      }),
      catchError(() => {
        throw new UnauthorizedException();
      }),
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
