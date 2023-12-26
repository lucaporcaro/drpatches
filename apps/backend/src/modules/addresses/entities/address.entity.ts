import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ulid } from 'ulid';
import User from '../../user/entities/user.entity';

@Entity({ tableName: 'addresses' })
export default class Address {
  @PrimaryKey({ index: true })
  id: string = ulid();

  @Property({ name: 'receiver_name' })
  receiverName: string;

  @Property({ name: 'receiver_phone' })
  receiverPhone: string;

  @Property()
  country: string;

  @Property()
  province: string;

  @Property()
  city: string;

  @Property({ name: 'zip_code' })
  zipCode: string;

  @Property()
  location: string;

  @ManyToOne({ entity: () => User, index: true })
  user: User;
}
