import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginRequestDto {
  @ApiProperty({ example: 'mohammadraufzahed@protonmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123#' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
