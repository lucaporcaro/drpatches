import { ApiProperty } from "@nestjs/swagger";

export class SelectProductDto {
    @ApiProperty({
        isArray: true,
        example: ['01HPC1PWARYTRPVHMZB455XPZJ']
    })
    products: string[];
}