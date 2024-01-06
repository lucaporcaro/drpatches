import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import PatchType from '../entities/patch-type.entity';
import { EntityRepository } from '@mikro-orm/core';
import { Observable, from } from 'rxjs';

@Injectable()
export default class PatchTypeService {
  constructor(
    @InjectRepository(PatchType)
    private readonly patchTypeRepo: EntityRepository<PatchType>,
  ) {}

  public getAll(): Observable<PatchType[]> {
    return from(
      this.patchTypeRepo.findAll({
        fields: ['id', 'image'],
        orderBy: { createdAt: 'DESC' },
        cache: 1000 * 60 * 10,
      }),
    );
  }
}
