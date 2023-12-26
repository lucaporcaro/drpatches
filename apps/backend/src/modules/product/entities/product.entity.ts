import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import BaseModel from 'src/common/entities/base-model.entity';
import PatchType from './patch-type.entity';
import User from 'src/modules/user/entities/user.entity';

export enum ProductType {
  IMAGE = 'image',
  TEXT = 'text',
}

export enum ProductStatus {
  CREATED = 'created',
  PAID = 'paid',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum ProductBackingType {
  DA_CUCIRE = 'da_cucire',
  TERMOADESIVA = 'termoadesiva',
  VELCRO_A = 'velcro_a',
  VELCRO_B = 'velcro_b',
  VELCRO_A_B = 'velcro_a_b',
}

@Entity({ tableName: 'products' })
export default class Product extends BaseModel {
  @Enum(() => ProductType)
  type!: ProductType;

  @Property({ nullable: true })
  text?: string;

  @Property({ name: 'border_color', nullable: true })
  borderColor?: string;

  @Property({ name: 'text_color', nullable: true })
  textColor?: string;

  @Property({ name: 'background_color', nullable: true })
  backgroundColor?: string;

  @Property({ name: 'patch_width' })
  patchWidth: number;

  @Property({ name: 'patch_height' })
  patchHeight: number;

  @Property()
  quantity: number;

  @ManyToOne(() => PatchType, { index: true })
  patchType!: PatchType;

  @Enum({ items: () => ProductBackingType, name: 'backing_type' })
  backingType: string;

  @Property({ nullable: true })
  image?: string;

  @Property({ type: 'double' })
  price: number | string;

  @Enum({ items: () => ProductStatus, index: true })
  status!: ProductStatus;

  @ManyToOne(() => User, { index: true })
  user!: User;
}
