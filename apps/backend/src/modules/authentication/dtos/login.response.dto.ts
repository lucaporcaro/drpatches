import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class LoginResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;
}
