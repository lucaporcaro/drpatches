import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dtos/add-to-cart.dto';
// import { UpdateCartDto } from './dtos/update-cart.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import Cart from './entities/cart.entity';
import { EntityRepository, Loaded } from '@mikro-orm/core';
import User from '../user/entities/user.entity';
import Product, { ProductStatus } from '../product/entities/product.entity';
import { RemoveFromCartDto } from './dtos/remove-from-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: EntityRepository<Cart>,
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Product)
    private readonly productRepo: EntityRepository<Product>,
  ) {}

  async getCart(user: User) {
    let cart: Cart;
    try {
      cart = await this.cartRepo.findOneOrFail(
        { user },
        { populate: ['products.id', 'user.id'] },
      );
    } catch (e) {
      cart = this.cartRepo.create({ user });
      await this.cartRepo.persistAndFlush([cart]);
    }
    return cart;
  }

  async findUser(userId: string) {
    try {
      const user = await this.userRepo.findOneOrFail({ id: userId });
      return user;
    } catch (e) {
      throw new NotFoundException('user not found');
    }
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    const user = await this.findUser(userId);
    const cart = await this.getCart(user);
    const products = await this.productRepo.find({
      // $and: [
      //   {
      //     id: { $in: addToCartDto.products },
      //   },
      //   {
      //     status: { $in: [ProductStatus.CREATED, ProductStatus.DELIVERED] },
      //   },
      //   {
      //     user: user.id,
      //   },
      // ],
      id: { $in: addToCartDto.products },
    });
    if (products.length > 0) {
      for (const product of products) {
        if (!cart.products.find((p) => p.id === product.id))
          cart.products.add(product);
      }
      cart.totalPrice = cart.products
        .map((product) => Number(product.price) * product.quantity)
        .reduce((a, b) => a + b, 0);
      await this.cartRepo.persistAndFlush([cart]);
    }
    return { products: cart.products, totalPrice: cart.totalPrice };
  }

  async findOne(userId: string) {
    const cart = await this.getCart(await this.findUser(userId));
    return { products: cart.products, totalPrice: cart.totalPrice };
  }

  async remove(userId: string, removeFromCartDto: RemoveFromCartDto) {
    const user = await this.findUser(userId);
    const cart = await this.getCart(user);
    cart.products.remove((p) => removeFromCartDto.products.includes(p.id));
    await this.cartRepo.persistAndFlush([cart]);
    return { products: cart.products, totalPrice: cart.totalPrice };
  }
}
