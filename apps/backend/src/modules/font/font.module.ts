import { Module } from '@nestjs/common';
import { FontService } from './font.service';
import { FontController } from './font.controller';

@Module({
  providers: [FontService],
  controllers: [FontController]
})
export class FontModule {}
