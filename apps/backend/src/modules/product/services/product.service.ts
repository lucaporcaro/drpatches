import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import Product, { ProductType } from '../entities/product.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import PatchType from '../entities/patch-type.entity';
import User from '../../user/entities/user.entity';
import UpdateProductRequestDto from '../dtos/update-product.request.dto';
import {
  catchError,
  from,
  map,
  mergeMap,
  throwError,
  throwIfEmpty,
} from 'rxjs';

@Injectable()
export default class ProductService {
  private entityManager: EntityManager;

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: EntityRepository<Product>,
    @InjectRepository(PatchType)
    private readonly patchTypeRepo: EntityRepository<PatchType>,
  ) {
    this.entityManager = productRepo.getEntityManager();
  }

  public createProduct(user: User, type: ProductType) {
    const product = this.productRepo.create({
      user,
      type,
    });
    return from(this.entityManager.persistAndFlush([product])).pipe(
      map(() => product),
      catchError((e) => throwError(() => e)),
    );
  }

  public getAll(id: string) {
    return from(
      this.productRepo.find({ user: { id } }, { populate: ['patchType.id'] }),
    ).pipe(
      map((products) =>
        products.map((product) =>
          Object.assign(product, { patchType: product?.patchType?.id || null }),
        ),
      ),
      catchError((e) => throwError(() => e)),
    );
  }

  public getOne(id: string, userId: string) {
    return from(
      this.productRepo.findOneOrFail(
        { id, user: { id: userId } },
        { populate: ['patchType.id'] },
      ),
    ).pipe(
      map((product) =>
        Object.assign(product, {
          patchType: product?.patchType?.id || null,
        }),
      ),
      catchError(() => {
        throw new NotFoundException('Product not found');
      }),
    );
  }

  public updateProduct(
    id: string,
    userId: string,
    payload: UpdateProductRequestDto,
    image: Express.Multer.File | undefined = undefined,
  ) {
    return from(
      this.productRepo.findOne(
        {
          id,
          user: { id: userId },
        },
        {
          populate: ['patchType.id'],
        },
      ),
    ).pipe(
      mergeMap((product) => {
        if (!product) throw new NotFoundException('Product not found');
        const { patchType, ...data } = payload;
        for (const key of ['patchWidth', 'patchHeight', 'quantity'])
          if (payload[key]) payload[key] = parseFloat(payload[key]);
        Object.assign(product, data);
        if (image) product.image = image.filename;
        if (patchType !== 'null' && patchType !== product?.patchType?.id)
          return from(
            this.patchTypeRepo.findOneOrFail({
              id: patchType,
            }),
          ).pipe(
            mergeMap((patchType) => {
              product.patchType = patchType;
              return from(this.entityManager.flush()).pipe(
                map(() => product),
                catchError((e) => throwError(() => e)),
              );
            }),
            catchError(() => {
              throw new NotFoundException('Patch type not found');
            }),
          );

        return from(this.entityManager.flush()).pipe(
          map(() => product),
          catchError((e) => throwError(() => e)),
        );
      }),
      catchError((e) => throwError(() => e)),
    );
  }
}
