import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  EntityManager,
  Enum,
  EventArgs,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import BaseModel from 'src/common/entities/base-model.entity';
import PatchType from './patch-type.entity';
import User from 'src/modules/user/entities/user.entity';
import BackingPrice from './backing-price.entity';
import { generatePricesTable } from '../services/price.service';
import { catchError, from, lastValueFrom, map, of } from 'rxjs';
import Font from 'src/modules/font/entities/font.entity';

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

  @Property({ nullable: true, default: '' })
  text?: string;

  @Property({ name: 'border_color', default: '#111' })
  borderColor?: string;

  @Property({ name: 'text_color', default: '#111' })
  textColor?: string;

  @Property({ name: 'background_color', default: '#fff' })
  backgroundColor?: string;

  @Property({ name: 'patch_width', default: 10, type: 'double' })
  patchWidth: number;

  @Property({ name: 'patch_height', default: 10, type: 'double' })
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

  @Property({ name: 'stripe_id', nullable: true })
  stripeId?: string;

  @Property({ nullable: true, default: '' })
  note?: string;

  @ManyToOne(() => User, { index: true, nullable: true })
  user?: User;

  @ManyToOne(() => Font, { nullable: true })
  font!: Font;

  @Property({ name: 'is_ready_for_payment' })
  isReadyForPayment: boolean = false;

  // Events
  @BeforeUpdate()
  async beforeUpdate({ entity, em }: EventArgs<Product>) {
    entity.price = parseFloat((await calculatePrice(entity, em)) as any);
    entity.isReadyForPayment = validateProduct(entity, entity.type === 'image');
    return entity;
  }

  @BeforeCreate()
  async beforeCreate({ entity, em }: EventArgs<Product>) {
    entity.price = parseFloat((await calculatePrice(entity, em)) as any);
    entity.isReadyForPayment = validateProduct(entity, entity.type === 'image');
    return entity;
  }
}

function validateProduct(entity: Product, isImage = false) {
  const keys = isImage
    ? ['image', 'patchHeight', 'patchWidth', 'quantity', 'backingType']
    : [
        'text',
        'patchHeight',
        'patchWidth',
        'quantity',
        'backingType',
        'font',
        'borderColor',
        'backgroundColor',
        'textColor',
        'patchType',
      ];

  for (const key of keys) {
    if (typeof entity[key] === 'undefined' || !entity[key]) {
      return false;
    }
  }
  return true;
}

async function calculatePrice(entity: Product, em: EntityManager) {
  // eslint-disable-next-line prefer-const
  let { type, backingType, patchHeight, patchWidth, quantity } = entity;

  patchHeight = parseFloat(patchHeight as any);
  patchWidth = parseFloat(patchWidth as any);

  if (!type || !backingType) {
    return 0;
  }

  const priceRepo = em.getRepository(BackingPrice);
  return lastValueFrom(
    from(priceRepo.findAll({ fields: ['price', 'size', 'type'] })).pipe(
      map((pricesD) => {
        const prices = generatePricesTable({}, pricesD as any);
        const size = (patchWidth + patchHeight) / 2;
        const tablePrice = Object.entries(prices[type])
          .filter(([key]) => {
            return (typeof key === 'number' ? key : parseFloat(key)) >= size;
          })
          .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))[0] as any[];
        const pricePerOne =
          (tablePrice ? tablePrice[1] : 0) +
          (type === 'image' ? 39 / quantity : 0);

        const backingPriceLookup: { [key: string]: number } = {
          termoadesiva: ((patchWidth * patchHeight * 8) / 7500) * 2,
          velcro_a: (patchWidth * patchHeight * 18) / 2500 + pricePerOne * 0.5,
          velcro_b: (patchWidth * patchHeight * 18) / 2500 + pricePerOne * 0.5,
          velcro_a_b:
            (patchWidth * patchHeight * 36) / 2500 + pricePerOne * 0.5,
        };
        const backingPrice = backingPriceLookup[backingType] || 0;
        return ((pricePerOne + backingPrice) * 1.22 * quantity).toFixed(2);
      }),
      catchError(() => of(0)),
    ),
  );
}
