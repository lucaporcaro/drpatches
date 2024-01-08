import { Body, Controller, Post } from '@nestjs/common';

import RegisterRequestDto from './dtos/register.request.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import LoginResponseDto from './dtos/login.response.dto';
import { AuthenticationService } from './authentication.service';
import LoginRequestDto from './dtos/login.request.dto';
import { from } from 'rxjs';

@Controller({ path: 'authentication', version: '1' })
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('register')
  @ApiCreatedResponse({ type: LoginResponseDto })
  register(@Body() payload: RegisterRequestDto) {
    return this.service.register(payload);
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponseDto })
  public login(@Body() { email, password }: LoginRequestDto) {
    return this.service.login(email, password);
  }
}
