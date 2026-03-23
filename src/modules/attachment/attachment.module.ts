import { Module } from '@nestjs/common';
import { AttachmentService } from './services/attachment.service';
import { AttachmentController } from './controllers/attachment.controller';
import { S3Service } from './services/s3.service';

@Module({
  controllers: [AttachmentController],
  providers: [AttachmentService, S3Service],
  exports: [AttachmentService],
})
export class AttachmentModule {}
