import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsHexColor,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductBackingType, ProductType } from '../entities/product.entity';

export default class UpdateProductRequestDto {
  @ApiProperty({
    enum: ProductType,
    required: false,
    default: ProductType.TEXT,
  })
  @IsEnum(ProductType)
  @IsOptional()
  type!: ProductType;

  @ApiProperty({ required: false, default: 'Hello World' })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({ required: false, default: '#111' })
  @IsHexColor()
  @IsOptional()
  borderColor?: string;

  @ApiProperty({ required: false, default: '#111' })
  @IsOptional()
  @IsHexColor()
  textColor?: string;

  @ApiProperty({ required: false, default: '#111' })
  @IsHexColor()
  @IsOptional()
  backgroundColor?: string;

  @ApiProperty({ required: false, default: 10 })
  @IsNumberString()
  @IsOptional()
  patchWidth: string;

  @ApiProperty({ required: false, default: 10 })
  @IsNumberString()
  @IsOptional()
  patchHeight: string;

  @ApiProperty({ required: false, default: 50 })
  @IsNumberString()
  @IsOptional()
  quantity: string;

  @ApiProperty({ required: false, default: null })
  @IsString()
  @IsOptional()
  patchType: string;

  @ApiProperty({
    enum: ProductBackingType,
    required: false,
    default: ProductBackingType.DA_CUCIRE,
  })
  @IsEnum(ProductBackingType)
  @IsOptional()
  backingType!: ProductBackingType;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  stripeId?: string;
}
