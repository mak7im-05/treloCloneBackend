import { Module } from '@nestjs/common';
import { LabelService } from './services/label.service';
import { LabelController } from './controllers/label.controller';

@Module({
  controllers: [LabelController],
  providers: [LabelService],
  exports: [LabelService],
})
export class LabelModule {}
