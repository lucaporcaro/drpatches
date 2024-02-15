import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import BaseModel from 'src/common/entities/base-model.entity';
import Address from 'src/modules/addresses/entities/address.entity';
import Cart from 'src/modules/cart/entities/cart.entity';
import Product from 'src/modules/product/entities/product.entity';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity({ tableName: 'users' })
export default class User extends BaseModel {
  @Property({ unique: true, nullable: false })
  email: string;

  @Property({ nullable: false, hidden: true })
  password: string;

  @Enum({ items: () => UserRole, nullable: true, default: UserRole.CUSTOMER })
  role!: UserRole;

  @Property({ name: 'first_name', nullable: false })
  firstName: string;

  @Property({ name: 'last_name', nullable: false })
  lastName: string;

  @Property({ unique: true, nullable: false })
  phone: string;

  @Property({ unique: true, nullable: true })
  fiscal: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses = new Collection<Location>(this);

  @OneToMany(() => Product, (product) => product.user)
  products = new Collection<Product>(this);

  @OneToMany(() => Cart, (cart) => cart.user)
  carts = new Collection<Cart>(this);

  // @OneToOne(() => Cart, (cart) => cart.user, {
  //   orphanRemoval: true,
  //   nullable: true,
  // })
  // cart?: Cart;
}
