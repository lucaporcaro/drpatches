import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import BackingPrice from 'src/modules/product/entities/backing-price.entity';

const defaultPrices = {
  text: {
    2.5: 0.58,
    3.5: 0.72,
    4: 0.81,
    4.5: 0.92,
    5: 1.0,
    5.5: 1.15,
    6: 1.26,
    6.5: 1.35,
    7: 1.49,
    7.5: 1.56,
    8: 1.63,
    8.5: 1.66,
    9: 1.78,
    9.5: 1.92,
    10: 2.07,
    10.5: 2.23,
    11: 2.38,
    11.5: 2.51,
    12: 2.67,
    12.5: 2.85,
    13: 3.03,
    13.5: 3.22,
    14: 3.41,
    14.5: 3.61,
    15: 3.82,
    15.5: 4.03,
    16: 4.23,
    16.5: 4.46,
    17: 4.72,
    17.5: 4.93,
    18: 6.19,
    18.5: 6.52,
    19: 6.82,
    19.5: 7.14,
    20: 7.44,
  },
  image: {
    2.5: 0.61,
    3.5: 0.76,
    4: 0.86,
    4.5: 0.98,
    5: 1.06,
    5.5: 1.22,
    6: 1.34,
    6.5: 1.43,
    7: 1.57,
    7.5: 1.66,
    8: 1.72,
    8.5: 1.76,
    9: 1.88,
    9.5: 2.03,
    10: 2.19,
    10.5: 2.36,
    11: 2.52,
    11.5: 2.66,
    12: 2.83,
    12.5: 3.01,
    13: 3.21,
    13.5: 3.41,
    14: 3.61,
    14.5: 3.82,
    15: 4.04,
    15.5: 4.26,
    16: 4.48,
    16.5: 4.72,
    17: 5.0,
    17.5: 5.22,
    18: 6.55,
    18.5: 6.9,
    19: 7.22,
    19.5: 7.56,
    20: 7.88,
  },
};

export class BackingPriceSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    if (await em.count(BackingPrice)) return;

    for (const type of Object.keys(defaultPrices))
      for (const size in defaultPrices[type])
        em.create(BackingPrice, {
          size: parseFloat(size),
          price: defaultPrices[type][size],
          type: type as any,
        });
  }
}
