import { ApiProperty } from '@nestjs/swagger';
import UpdateUserRequestDto from './update-user-information.request.dto';
import { UserRole } from '../entities/user.entity';
import { IsEnum } from 'class-validator';

export default class GetUserResponseDto extends UpdateUserRequestDto {
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role!: UserRole;
}
