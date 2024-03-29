import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import BaseModel from 'src/common/entities/base-model.entity';
import Product from 'src/modules/product/entities/product.entity';
import User from 'src/modules/user/entities/user.entity';

export enum CartStatus {
  OPEN = 'open',
  CLOSE = 'close',
}

@Entity({ tableName: 'carts' })
export default class Cart extends BaseModel {
  @ApiProperty({ example: 34 })
  @Property({ type: 'double', default: 0 })
  totalPrice: number;

  @ApiProperty({})
  @Property({ name: 'stripe_id', nullable: true })
  stripeId?: string;

  // @ApiProperty()
  @OneToMany(() => Product, (product) => product.cart)
  products = new Collection<Product>(this);

  // @ApiProperty()
  // @OneToOne(() => User, (user) => user.cart, { owner: true, nullable: true })
  // user?: User;

  @ManyToOne(() => User, { nullable: true })
  user?: User;

  @Enum({
    items: () => CartStatus,
    index: true,
    default: CartStatus.OPEN,
  })
  status!: CartStatus;
}
