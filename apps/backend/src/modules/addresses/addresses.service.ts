import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import Address from './entities/address.entity';
import CreateAddressRequestDto from './dtos/create-address.request.dto';
import User from '../user/entities/user.entity';
import UpdateAddressRequestDto from './dtos/update-address.request.dto';
import { catchError, from, map, mergeMap, throwError } from 'rxjs';

@Injectable()
export class AddressesService {
  private em: EntityManager;

  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: EntityRepository<Address>,
  ) {
    this.em = addressRepo.getEntityManager();
  }

  public create(payload: CreateAddressRequestDto, user: User) {
    const address = this.addressRepo.create({ ...payload, user });
    return from(this.em.persistAndFlush([address])).pipe(
      map(() => Object.assign(address)),
      catchError((e) => throwError(() => e)),
    );
  }

  public getAll(id: string) {
    return from(this.addressRepo.find({ user: { id } })).pipe(
      map((all) => all),
      catchError((e) => throwError(() => e)),
    );
  }

  public getOne(userId: string, id: string) {
    return from(
      this.addressRepo.findOneOrFail({ id, user: { id: userId } }),
    ).pipe(
      map((address) => address),
      catchError(() => {
        throw new NotFoundException('Address did not found');
      }),
    );
  }

  public update(id: string, payload: UpdateAddressRequestDto, userId: string) {
    return from(
      this.addressRepo.findOneOrFail({
        id,
        user: { id: userId },
      }),
    ).pipe(
      mergeMap((address) => {
        Object.assign(address, payload);
        return from(this.em.flush());
      }),
      catchError(() => {
        throw new NotFoundException('Address did not found');
      }),
    );
  }

  public delete(userId: string, id: string) {
    return from(
      this.addressRepo.findOneOrFail(
        {
          id,
          user: { id: userId },
        },
        { fields: ['id'] },
      ),
    ).pipe(
      mergeMap((address) => {
        return from(this.em.removeAndFlush(address));
      }),
      catchError(() => {
        throw new NotFoundException('Address did not found');
      }),
    );
  }
}
