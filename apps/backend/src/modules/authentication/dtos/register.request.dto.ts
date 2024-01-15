import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export default class RegisterRequestDto {
  @ApiProperty({ example: 'mohammadraufzahed@protonmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123#' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Mohammad' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Password' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: '+989371295382' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
