import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import BaseModel from 'src/common/entities/base-model.entity';
import Product from './product.entity';

@Entity({ tableName: 'patch_types' })
export default class PatchType extends BaseModel {
  @Property()
  image: string;

  @Property({ nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.patchType)
  products = new Collection<Product>(this);
}
