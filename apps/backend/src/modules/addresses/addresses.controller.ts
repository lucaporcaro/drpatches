import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import JwtGaurd from '../authentication/gaurd/jwt.gaurd';
import { AddressesService } from './addresses.service';
import CreateAddressRequestDto from './dtos/create-address.request.dto';
import GetAddressResponseDto from './dtos/get-address.response.dto';
import UpdateAddressRequestDto from './dtos/update-address.request.dto';

@Controller({ path: 'addresses', version: '1' })
@ApiTags('Address')
@ApiBearerAuth()
@UseGuards(JwtGaurd)
export class AddressesController {
  constructor(private readonly service: AddressesService) {}

  @Post()
  @ApiCreatedResponse({ type: GetAddressResponseDto })
  public async create(
    @Body() payload: CreateAddressRequestDto,
    @Request() { user },
  ) {
    return await this.service.create(payload, user);
  }

  @Get('all')
  @ApiOkResponse({ type: GetAddressResponseDto, isArray: true })
  public async getAll(@Request() { user: { id } }: any) {
    return await this.service.getAll(id);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: GetAddressResponseDto })
  public async getOne(
    @Request() { user: { id: userId } },
    @Param('id') id: string,
  ) {
    return await this.service.getOne(userId, id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: GetAddressResponseDto })
  public async update(
    @Body() payload: UpdateAddressRequestDto,
    @Param('id') id: string,
    @Request() { user: { id: userId } },
  ) {
    return await this.service.update(id, payload, userId);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: Boolean })
  public async delete(
    @Param('id') id: string,
    @Request() { user: { id: userId } },
  ) {
    return await this.service.delete(userId, id);
  }
}
