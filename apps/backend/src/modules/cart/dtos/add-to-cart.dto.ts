import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: ['01HPC1PWARYTRPVHMZB455XPZJ'], isArray: true })
  products: string[];
}
