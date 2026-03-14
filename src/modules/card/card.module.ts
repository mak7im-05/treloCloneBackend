import { Module } from '@nestjs/common';
import { CardService } from './services/card.service';

@Module({
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
