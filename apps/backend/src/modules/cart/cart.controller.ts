import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
// import { UpdateCartDto } from './dtos/update-cart.dto';
import JwtGuard from '../authentication/gaurd/jwt.gaurd';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveFromCartDto } from './dtos/remove-from-cart.dto';
import Cart from './entities/cart.entity';
import { AssignStripeIdDto } from './dtos/assign-stripeid.dto';

@ApiTags('Carts')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: AddToCartDto })
  @ApiResponse({ type: Cart })
  @UseGuards(JwtGuard)
  addToCart(
    @Request() { user: { id } }: any,
    @Body() createCartDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(id, createCartDto);
  }

  @Get()
  @ApiResponse({ type: Cart })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Request() { user: { id } }: any) {
    return this.cartService.findOne(id);
  }

  @Patch()
  @ApiBody({ type: RemoveFromCartDto })
  @ApiResponse({ type: Cart })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(
    @Request() { user: { id } }: any,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ) {
    return this.cartService.remove(id, removeFromCartDto);
  }

  @Put()
  @ApiBody({ type: AssignStripeIdDto })
  @UseGuards(JwtGuard)
  assignStripeId(
    @Request() { user: { id } }: any,
    @Body() { stripeId }: AssignStripeIdDto,
  ) {
    return this.cartService.assignStripeId(id, stripeId);
  }
}
