import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import BaseModel from 'src/common/entities/base-model.entity';
import Product from 'src/modules/product/entities/product.entity';
import User from 'src/modules/user/entities/user.entity';

@Entity({ tableName: 'carts' })
export default class Cart extends BaseModel {
  @Property({ type: 'double', default: 0 })
  totalPrice: number | string;

  @Property({ name: 'stripe_id', nullable: true })
  stripeId?: string;

  @OneToMany(() => Product, (product) => product.cart)
  products = new Collection<Product>(this);

  @OneToOne(() => User, (user) => user.cart, {
    orphanRemoval: true,
    nullable: true,
  })
  user?: User;
}
