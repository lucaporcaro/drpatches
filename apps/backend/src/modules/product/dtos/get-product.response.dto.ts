import { ApiProperty } from '@nestjs/swagger';
import UpdateProductRequestDto from './update-product.request.dto';
import { IsDateString, IsNumber, IsUrl } from 'class-validator';
import { ulid } from 'ulid';

export default class GetProductResponseDto extends UpdateProductRequestDto {
  @ApiProperty({ example: ulid() })
  id: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;
}
