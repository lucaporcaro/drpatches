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
  defer,
  from,
  map,
  of,
  switchMap,
  throwError,
  throwIfEmpty,
} from 'rxjs';
import Font from 'src/modules/font/entities/font.entity';

@Injectable()
export default class ProductService {
  private entityManager: EntityManager;

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: EntityRepository<Product>,
    @InjectRepository(PatchType)
    private readonly patchTypeRepo: EntityRepository<PatchType>,
    @InjectRepository(Font)
    private readonly fontRepo: EntityRepository<Font>,
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
    const product$ = from(
      this.productRepo.findOne(
        {
          id,
        },
        {
          populate: ['patchType.id', 'font.id'],
        },
      ),
    ).pipe(
      throwIfEmpty(() => new NotFoundException('Product not found')),
      catchError((e) => throwError(() => e)),
    );

    const updateProperties$ = defer(() =>
      product$.pipe(
        concatMap((product) => {
          const { patchType, font, ...data } = payload;

          for (const key in data)
            if (data[key] === 'null') data[key] = undefined;

          for (const key of ['patchWidth', 'patchHeight', 'quantity'])
            if (payload[key]) payload[key] = parseFloat(payload[key]);
          Object.assign(product, data);
          if (image) product.image = image.filename;

          return of(product);
        }),
        concatMap((product) => {
          const { patchType } = payload;
          if (patchType !== 'null' && patchType !== product?.patchType?.id)
            return from(
              this.patchTypeRepo.findOneOrFail({
                id: patchType,
              }),
            ).pipe(
              map((patchType) => {
                product.patchType = patchType;
                return product;
              }),
              catchError(() => {
                throw new NotFoundException('Patch type not found');
              }),
            );
          return of(product);
        }),
        concatMap((product) => {
          const { font } = payload;
          if (font != 'null' && font !== product?.font?.id)
            return from(this.fontRepo.findOneOrFail({ id: font })).pipe(
              concatMap((font) => {
                product.font = font;
                return of(product);
              }),
              catchError(() =>
                throwError(() => new NotFoundException('Font not found')),
              ),
            );
          return of(product);
        }),
        catchError((e) => throwError(() => e)),
      ),
    );

    return defer(() =>
      updateProperties$.pipe(
        concatMap((product) =>
          from(this.entityManager.flush()).pipe(map(() => product)),
        ),
        catchError((e) => throwError(() => e)),
      ),
    );

    // return from(
    //   this.productRepo.findOne(
    //     {
    //       id,
    //     },
    //     {
    //       populate: ['patchType.id'],
    //     },
    //   ),
    // ).pipe(
    //   mergeMap((product) => {
    //     if (!product) throw new NotFoundException('Product not found');
    //     const { patchType, ...data } = payload;
    //     for (const key of ['patchWidth', 'patchHeight', 'quantity'])
    //       if (payload[key]) payload[key] = parseFloat(payload[key]);
    //     Object.assign(product, data);
    //     if (image) product.image = image.filename;
    //     if (patchType !== 'null' && patchType !== product?.patchType?.id)
    //       return from(
    //         this.patchTypeRepo.findOneOrFail({
    //           id: patchType,
    //         }),
    //       ).pipe(
    //         mergeMap((patchType) => {
    //           product.patchType = patchType;
    //           return from(this.entityManager.flush()).pipe(
    //             map(() => product),
    //             catchError((e) => throwError(() => e)),
    //           );
    //         }),
    //         catchError(() => {
    //           throw new NotFoundException('Patch type not found');
    //         }),
    //       );

    //     return from(this.entityManager.flush()).pipe(
    //       map(() => product),
    //       catchError((e) => throwError(() => e)),
    //     );
    //   }),
    //   catchError((e) => throwError(() => e)),
    // );
  }
}
