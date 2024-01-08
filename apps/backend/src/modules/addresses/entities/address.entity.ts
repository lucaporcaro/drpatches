import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import User from '../../user/entities/user.entity';
import BaseModel from 'src/common/entities/base-model.entity';

@Entity({ tableName: 'addresses' })
export default class Address extends BaseModel {
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

  @ManyToOne({ entity: () => User, index: true, hidden: true })
  user: User;
}
