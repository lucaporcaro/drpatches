import { ApiProperty } from '@nestjs/swagger';

export class RemoveFromCartDto {
  @ApiProperty({ example: ['01HPC1PWARYTRPVHMZB455XPZJ'], isArray: true })
  products: string[];
}
