import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PriceService } from '../services';
import { Observable } from 'rxjs';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller({ path: 'prices', version: '1' })
@ApiTags('Prices')
export default class PriceController {
  constructor(private readonly service: PriceService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  public getAll(): Observable<any> {
    return this.service.getAll();
  }
}
