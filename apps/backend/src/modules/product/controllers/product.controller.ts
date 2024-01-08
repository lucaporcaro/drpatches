import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import JwtGuard from '../../authentication/gaurd/jwt.gaurd';
import ProductService from '../services/product.service';
import GetProductResponseDto from '../dtos/get-product.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import UpdateProductRequestDto from '../dtos/update-product.request.dto';
import { Request as ERequest } from 'express';
import { diskStorage } from 'src/common/storages/dist';
import CreateProductRequestDto from '../dtos/create-product.request.dto';

@Controller({ path: 'product', version: '1' })
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export default class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('all')
  @ApiOkResponse({ type: GetProductResponseDto, isArray: true })
  public getAll(@Request() { user: { id } }: any) {
    return this.service.getAll(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetProductResponseDto })
  @ApiParam({ name: 'id', type: String })
  public getOne(
    @Param('id') id: string,
    @Request() { user: { id: userId } }: any,
  ) {
    return this.service.getOne(id, userId);
  }

  @Post()
  @ApiCreatedResponse({ type: GetProductResponseDto })
  public create(
    @Request() { user }: any,
    @Body() payload: CreateProductRequestDto,
  ) {
    return this.service.createProduct(user, payload.type);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: GetProductResponseDto })
  @ApiParam({ name: 'id', type: String })
  @UseInterceptors(FileInterceptor('image', { storage: diskStorage }))
  public updateProduct(
    @Body() { image: _, ...payload }: UpdateProductRequestDto,
    @Param('id') id: string,
    @Request() { user: { id: userId } }: ERequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.service.updateProduct(id, userId, payload, image);
  }
}
