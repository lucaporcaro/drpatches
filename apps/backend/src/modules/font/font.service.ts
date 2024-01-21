import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Font from './entities/font.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { from } from 'rxjs';

@Injectable()
export class FontService {
  constructor(
    @InjectRepository(Font) private readonly fontRepo: EntityRepository<Font>,
  ) {}
  public all = () => {
    return from(
      this.fontRepo.findAll({ fields: ['id', 'image', 'name', 'file'] }),
    );
  };
}
