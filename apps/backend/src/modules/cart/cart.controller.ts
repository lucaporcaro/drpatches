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
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
// import { UpdateCartDto } from './dtos/update-cart.dto';
import JwtGuard from '../authentication/gaurd/jwt.gaurd';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemoveFromCartDto } from './dtos/remove-from-cart.dto';
import Cart from './entities/cart.entity';

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

  
  @Get(':id')
  @ApiParam({ name: 'id', description: 'get cart info' })
  @ApiResponse({ type: Cart })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }


  @Patch(':id')
  @ApiParam({ name: 'id', description: 'id of user that you want remove product from cart' })
  @ApiBody({ type: RemoveFromCartDto })
  @ApiResponse({ type: Cart })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(
    @Param('id') id: string,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ) {
    return this.cartService.remove(id, removeFromCartDto);
  }
}
