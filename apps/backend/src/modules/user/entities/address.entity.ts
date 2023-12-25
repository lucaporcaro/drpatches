import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ulid } from 'ulid';
import User from './user.entity';

@Entity({ tableName: 'addresses' })
export class Address {
  @PrimaryKey({ index: true })
  id: string = ulid();

  @Property({ name: 'receiver_name', unique: true })
  receiverName: string;

  @Property({ name: 'receiver_phone', unique: true })
  receiverPhone: string;

  @Property({ unique: true })
  province: string;

  @Property({ unique: true })
  city: string;

  @Property({ name: 'zip_code', unique: true })
  zipCode: string;

  @Property({ unique: true })
  location: string;

  @ManyToOne({ entity: () => User, index: true })
  user: User;
}
