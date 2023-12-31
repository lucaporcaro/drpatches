import {
  AfterUpdate,
  Entity,
  Enum,
  EventArgs,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
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
  @Enum({ items: () => ProductType, nullable: true })
  type!: ProductType;

  @Property({ nullable: true })
  text?: string;

  @Property({ name: 'border_color', default: '#111' })
  borderColor?: string;

  @Property({ name: 'text_color', default: '#111' })
  textColor?: string;

  @Property({ name: 'background_color', default: '#111' })
  backgroundColor?: string;

  @Property({ name: 'patch_width', default: 10 })
  patchWidth: number;

  @Property({ name: 'patch_height', default: 10 })
  patchHeight: number;

  @Property({ default: 50 })
  quantity: number;

  @ManyToOne(() => PatchType, { index: true, nullable: true })
  patchType!: PatchType;

  @Enum({
    items: () => ProductBackingType,
    name: 'backing_type',
    default: ProductBackingType.DA_CUCIRE,
  })
  backingType!: ProductBackingType;

  @Property({ nullable: true })
  image?: string;

  @Property({ type: 'double', default: 0 })
  price: number | string;

  @Enum({
    items: () => ProductStatus,
    index: true,
    default: ProductStatus.CREATED,
  })
  status!: ProductStatus;

  @ManyToOne(() => User, { index: true })
  user!: User;
}
