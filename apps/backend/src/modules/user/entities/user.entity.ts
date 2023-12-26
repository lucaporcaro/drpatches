import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import Address from 'src/modules/addresses/entities/address.entity';
import { ulid } from 'ulid';

export enum UserGender {
  MALE = 'm',
  FEMALE = 'f',
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity({ tableName: 'users' })
export default class User {
  @PrimaryKey({ index: true })
  id: string = ulid();

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
}
