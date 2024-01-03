import { Entity, Enum, Property } from '@mikro-orm/core';
import BaseModel from 'src/common/entities/base-model.entity';
import { ProductType } from './product.entity';

@Entity({ tableName: 'backing_prices' })
export default class BackingPrice extends BaseModel {
  @Property({ type: 'double' })
  price: number;

  @Property({ type: 'double' })
  size: number;

  @Enum({ items: () => ProductType })
  type!: ProductType;
}
