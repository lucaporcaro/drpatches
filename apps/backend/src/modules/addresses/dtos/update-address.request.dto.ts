import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export default class UpdateAddressRequestDto {
  @ApiProperty({ example: 'Mohammad Raufzahed' })
  @IsOptional()
  @IsString()
  receiverName: string;

  @ApiProperty({ example: '+989371295382' })
  @IsOptional()
  @IsPhoneNumber()
  receiverPhone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty({ example: 'Tehran' })
  @IsOptional()
  @IsString()
  province: string;

  @ApiProperty({ example: 'Tehran' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ example: '00022333445' })
  @IsOptional()
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 'Iran, Tehran, no 55' })
  @IsOptional()
  @IsString()
  location: string;
}
