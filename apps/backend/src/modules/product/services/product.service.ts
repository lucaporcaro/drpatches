import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import Product, { ProductType } from '../entities/product.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import PatchType from '../entities/patch-type.entity';
import User from '../../user/entities/user.entity';
import UpdateProductRequestDto from '../dtos/update-product.request.dto';

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

  public async createProduct(user: User, type: ProductType): Promise<Product> {
    const product = this.productRepo.create({
      user,
      type,
    });
    await this.entityManager.persistAndFlush([product]);
    return Object.assign(product, { user: undefined });
  }

  public async getAll(id: string) {
    const products = await this.productRepo.find(
      { user: { id } },
      { populate: ['patchType.id'] },
    );
    return products.map((product) =>
      Object.assign(product, { patchType: product?.patchType?.id || null }),
    );
  }

  public async getOne(id: string, userId: string) {
    try {
      const product = await this.productRepo.findOneOrFail(
        { id, user: { id: userId } },
        { populate: ['patchType.id'] },
      );
      return Object.assign(product, {
        patchType: product?.patchType?.id || null,
      });
    } catch {
      throw new NotFoundException('Product not found');
    }
  }

  public async updateProduct(
    id: string,
    userId: string,
    payload: UpdateProductRequestDto,
    image: Express.Multer.File | undefined = undefined,
  ) {
    const product = await this.productRepo.findOne(
      {
        id,
        user: { id: userId },
      },
      {
        populate: ['patchType.id'],
      },
    );
    if (!product) throw new NotFoundException('Product not found');
    const { patchType, ...data } = payload;

    for (const key of ['patchWidth', 'patchHeight', 'quantity'])
      if (payload[key]) payload[key] = parseFloat(payload[key]);

    Object.assign(product, data);
    if (patchType !== 'null' && patchType !== product?.patchType?.id) {
      const dbPatchType = await this.patchTypeRepo.findOne({ id: patchType });
      if (!dbPatchType) throw new NotFoundException('Patch type not found');
      product.patchType = dbPatchType;
    }
    console.dir(image);
    if (image) product.image = image.filename;
    await this.entityManager.flush();
    return product;
  }
}
