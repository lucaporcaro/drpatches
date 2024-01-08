import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import User from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import GetUserResponseDto from './dtos/update-user-information.request.dto';
import { catchError, from, map, mergeMap, throwError } from 'rxjs';
import { EntityField, EntityManager } from '@mikro-orm/core';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private em: EntityManager;
  private readonly SELECT_FIELDS: EntityField<User>[] = [
    'id',
    'createdAt',
    'updatedAt',
    'email',
    'role',
    'firstName',
    'lastName',
    'phone',
    'gender',
  ];

  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {
    this.em = userRepo.getEntityManager();
  }

  public getUser(id: string) {
    return from(
      this.userRepo.findOne(
        { id },
        {
          fields: this.SELECT_FIELDS,
        },
      ),
    ).pipe(
      map((user) => user),
      catchError((e) => throwError(() => e)),
    );
  }

  public updateUserInformation(id: string, payload: GetUserResponseDto) {
    return from(this.userRepo.findOne({ id })).pipe(
      mergeMap((user) => {
        for (const key of Object.keys(payload)) {
          const payloadValue =
            key !== 'phone' ? payload[key] : payload[key].replaceAll(' ', '');
          if (user[key] != payloadValue) user[key] = payloadValue;
        }
        return from(this.em.flush());
      }),
      mergeMap(() => from(this.getUser(id))),
      catchError((e) => {
        this.logger.error(e);
        return throwError(() => e);
      }),
    );
  }
}
