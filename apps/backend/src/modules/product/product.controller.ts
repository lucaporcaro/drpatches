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
import JwtGaurd from '../authentication/gaurd/jwt.gaurd';
import ProductService from './product.service';
import GetProductResponseDto from './dtos/get-product.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import UpdateProductRequestDto from './dtos/update-product.request.dto';
import { Request as ERequest } from 'express';
import { diskStorage } from 'src/common/storages/dist';

@Controller({ path: 'product', version: '1' })
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtGaurd)
export default class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('all')
  @ApiOkResponse({ type: GetProductResponseDto, isArray: true })
  public async getAll(@Request() { user: { id } }: any) {
    return await this.service.getAll(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetProductResponseDto })
  @ApiParam({ name: 'id', type: String })
  public async getOne(
    @Param('id') id: string,
    @Request() { user: { id: userId } }: any,
  ) {
    return await this.service.getOne(id, userId);
  }

  @Post()
  @ApiCreatedResponse({ type: GetProductResponseDto })
  public async create(@Request() { user }: any) {
    return await this.service.createProduct(user);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: GetProductResponseDto })
  @ApiParam({ name: 'id', type: String })
  @UseInterceptors(FileInterceptor('image', { storage: diskStorage }))
  public async updateProduct(
    @Body() { image: _, ...payload }: UpdateProductRequestDto,
    @Param('id') id: string,
    @Request() { user: { id: userId } }: ERequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.service.updateProduct(id, userId, payload, image);
  }
}