import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import IsVatOrFiscalCode from 'src/common/validators/IsVatOrFiscalCode';

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

  @ApiProperty({})
  // @IsVatOrFiscalCode({ message: 'Fiscal Code is not valid' })
  // @IsNotEmpty()
  fiscal: string;
}
