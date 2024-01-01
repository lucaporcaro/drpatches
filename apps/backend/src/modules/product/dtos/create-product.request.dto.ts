import { ApiProperty } from "@nestjs/swagger";
import { ProductType } from "../entities/product.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export default class CreateProductRequestDto {
  @ApiProperty({
    enum: ProductType, default: ProductType.TEXT
  })
  @IsEnum({ enum: ProductType })
  @IsNotEmpty()
  type!: ProductType;
}
