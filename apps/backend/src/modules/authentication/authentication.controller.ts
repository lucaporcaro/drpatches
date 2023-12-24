import { Body, Controller, Post } from '@nestjs/common';

import RegisterRequestDto from './dtos/register.request.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import LoginResponseDto from './dtos/login.response.dto';
import { AuthenticationService } from './authentication.service';
import LoginRequestDto from './dtos/login.request.dto';

@Controller({ path: 'authentication', version: '1' })
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('register')
  @ApiCreatedResponse({ type: LoginResponseDto })
  async register(@Body() payload: RegisterRequestDto) {
    return await this.service.register(payload);
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponseDto })
  public async login(@Body() { email, password }: LoginRequestDto) {
    return await this.service.login(email, password);
  }
}
