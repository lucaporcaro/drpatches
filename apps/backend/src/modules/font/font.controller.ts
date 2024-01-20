import { Controller, Get } from '@nestjs/common';
import { FontService } from './font.service.js';
import { ApiTags } from '@nestjs/swagger';

@Controller('font')
@ApiTags('Fonts')
export class FontController {
  constructor(private readonly fontService: FontService) {}

  @Get()
  all() {
    return this.fontService.all();
  }
}
