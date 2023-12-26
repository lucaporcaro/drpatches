import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class GetAddressResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  receiverName: string;

  @ApiProperty()
  @IsString()
  receiverPhone: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  zipCode: string;

  @ApiProperty()
  @IsString()
  location: string;
}
