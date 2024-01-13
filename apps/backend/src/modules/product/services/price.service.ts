import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import BackingPrice from '../entities/backing-price.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { from } from 'rxjs';
import { reduce } from 'rxjs/operators';

@Injectable()
export default class PriceService {
  constructor(
    @InjectRepository(BackingPrice)
    private readonly priceRepo: EntityRepository<BackingPrice>,
  ) {}

  public getAll() {
    const prices$ = from(
      this.priceRepo.find(
        {},
        {
          fields: ['price', 'size', 'type'],
          cache: 1000 * 60 * 5,
        },
      ),
    );

    return prices$.pipe(reduce(generatePricesTable, {}));
  }
}
export function generatePricesTable(baseTable = {}, prices: any[]) {
  for (const { price, size, type } of prices) {
    if (!baseTable[type]) baseTable[type] = {};
    baseTable[type][size] = price;
  }
  return baseTable;
}
