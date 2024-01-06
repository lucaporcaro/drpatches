import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import PatchType from '../entities/patch-type.entity';
import PatchTypeService from '../services/patch-type.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'patch-type', version: '1' })
@ApiTags('Patch Type')
export default class PatchTypeController {
  constructor(private readonly service: PatchTypeService) {}
  @Get()
  getAll(): Observable<PatchType[]> {
    return this.service.getAll();
  }
}
