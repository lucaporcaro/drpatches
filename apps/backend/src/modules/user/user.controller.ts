import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import GetUserResponseDto from './dtos/get-user.response.dto';
import { UserService } from './user.service';
import { Request as ERequest } from 'express';
import JwtGaurd from '../authentication/gaurd/jwt.gaurd';
import UpdateUserRequestDto from './dtos/update-user-information.request.dto';

@Controller({ path: 'user', version: '1' })
@ApiTags('User')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtGaurd)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiOkResponse({ type: GetUserResponseDto })
  public async getUser(@Request() { user: { id } }: ERequest) {
    return await this.service.getUser(id);
  }

  @Patch()
  @ApiOkResponse({ type: GetUserResponseDto })
  public async updateUserInformation(
    @Body() payload: UpdateUserRequestDto,
    @Request() { user: { id } }: ERequest,
  ) {
    return await this.service.updateUserInformation(id, payload);
  }
}
