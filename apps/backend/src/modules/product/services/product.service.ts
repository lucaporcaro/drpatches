import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import Product, { ProductType } from '../entities/product.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import PatchType from '../entities/patch-type.entity';
import User from '../../user/entities/user.entity';
import UpdateProductRequestDto from '../dtos/update-product.request.dto';
import {
  catchError,
  concatMap,
  from,
  map,
  mergeMap,
  switchMap,
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

  public createProduct(type: ProductType) {
    const product = this.productRepo.create({
      type,
    });
    return from(this.entityManager.persistAndFlush([product])).pipe(
      map(() => product),
      catchError((e) => throwError(() => e)),
    );
  }

  public assignUser(id: string, user: User) {
    return from(this.productRepo.findOneOrFail({ id })).pipe(
      switchMap((product) => {
        product.user = user;
        return from(this.entityManager.flush()).pipe(
          catchError((e) => throwError(() => e)),
        );
      }),
      catchError(() => {
        throw new NotFoundException('Product not found');
      }),
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

  public getOne(id: string) {
    return from(
      this.productRepo.findOneOrFail({ id }, { populate: ['patchType.id'] }),
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
    payload: UpdateProductRequestDto,
    image: Express.Multer.File | undefined = undefined,
  ) {
    return from(
      this.productRepo.findOne(
        {
          id,
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
