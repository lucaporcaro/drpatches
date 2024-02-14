import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import JwtGuard from '../../authentication/gaurd/jwt.gaurd';
import ProductService from '../services/product.service';
import GetProductResponseDto from '../dtos/get-product.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'src/common/storages/dist';
import CreateProductRequestDto from '../dtos/create-product.request.dto';
import UpdateProductRequestDto from 'src/modules/product/dtos/update-product.request.dto';
import { SelectProductDto } from '../dtos/select-product.dto';

@Controller({ path: 'product', version: '1' })
@ApiTags('Products')
export default class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('all')
  @ApiOkResponse({ type: GetProductResponseDto, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public getAll(@Request() { user: { id } }: any) {
    return this.service.getAll(id);
  }

  @Post('select')
  @ApiResponse({ type: SelectProductDto })
  selectProduct(@Body() { products }: SelectProductDto) {

  }

  @Get(':id')
  @ApiOkResponse({ type: GetProductResponseDto })
  @ApiParam({ name: 'id', type: String })
  public getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: GetProductResponseDto })
  public create(@Body() payload: CreateProductRequestDto) {
    return this.service.createProduct(payload.type);
  }

  @Put('assign/:id')
  @ApiParam({ name: 'id', required: true })
  @ApiCreatedResponse({ type: GetProductResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public assignUser(@Request() { user }: any, @Param('id') id: string) {
    return this.service.assignUser(id, user);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: GetProductResponseDto })
  @ApiParam({ name: 'id', type: String })
  @UseInterceptors(FileInterceptor('image', { storage: diskStorage }))
  public updateProduct(
    @Body() { image: _, ...payload }: UpdateProductRequestDto,
    @Param('id') id: string,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.service.updateProduct(id, payload, image);
  }
}
