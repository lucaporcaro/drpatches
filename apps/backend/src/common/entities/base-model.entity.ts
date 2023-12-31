import { PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ulid } from 'ulid';

export default class BaseModel {
  @PrimaryKey({ index: true })
  id: string = ulid();

  @Property({ name: 'created_at', index: true })
  createdAt: Date = new Date();

  @Property({
    name: 'updated_at',
    onUpdate: () => new Date(),
    index: true,
  })
  updatedAt: Date = new Date();
}
