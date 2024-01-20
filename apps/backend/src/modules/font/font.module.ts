import { Module } from '@nestjs/common';
import { FontService } from './font.service';
import { FontController } from './font.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Font from './entities/font.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Font])],
  providers: [FontService],
  controllers: [FontController],
})
export class FontModule {}
