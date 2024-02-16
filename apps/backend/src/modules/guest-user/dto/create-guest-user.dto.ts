import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateGuestUserDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({})
  @IsNotEmpty()
  fiscal: string;

  @ApiProperty({ example: 'Password123#' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
