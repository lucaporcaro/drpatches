import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import BaseModel from 'src/common/entities/base-model.entity';
import Address from 'src/modules/addresses/entities/address.entity';
import Product from 'src/modules/product/entities/product.entity';

export enum UserGender {
  MALE = 'm',
  FEMALE = 'f',
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity({ tableName: 'users' })
export default class User extends BaseModel {
  @Property({ unique: true, nullable: false })
  email: string;

  @Property({ nullable: false })
  password: string;

  @Enum({ items: () => UserRole, nullable: true, default: UserRole.CUSTOMER })
  role!: UserRole;

  @Property({ name: 'first_name', nullable: false })
  firstName: string;

  @Property({ name: 'last_name', nullable: false })
  lastName: string;

  @Property({ unique: true, nullable: false })
  phone: string;

  @Enum({ items: () => UserGender, nullable: false })
  gender!: UserGender;

  @OneToMany(() => Address, (address) => address.user)
  addresses = new Collection<Location>(this);

  @OneToMany(() => Product, (product) => product.user)
  products = new Collection<Product>(this);
}
