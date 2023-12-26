import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export default class CreateAddressRequestDto {
  @ApiProperty({ example: 'Mohammad Raufzahed' })
  @IsNotEmpty()
  @IsString()
  receiverName: string;

  @ApiProperty({ example: '+989371295382' })
  @IsNotEmpty()
  @IsPhoneNumber()
  receiverPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'Tehran' })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({ example: 'Tehran' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '00022333445' })
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 'Iran, Tehran, no 55' })
  @IsNotEmpty()
  @IsString()
  location: string;
}
