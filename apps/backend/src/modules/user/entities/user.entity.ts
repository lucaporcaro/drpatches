import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { ulid } from 'ulid';

@Entity({ tableName: 'users' })
export default class User {
  @PrimaryKey({ index: true })
  id: string = ulid();

  @Property({ unique: true, nullable: false })
  email: string;

  @Property({ nullable: false })
  password: string;

  @Property({ name: 'first_name', nullable: false })
  firstName: string;

  @Property({ name: 'last_name', nullable: false })
  lastName: string;

  @Property({ unique: true, nullable: false })
  phone: string;

  @Enum({ items: () => UserGender, nullable: false })
  gender!: UserGender;
}

export enum UserGender {
  MALE = 'm',
  FEMALE = 'f',
}
