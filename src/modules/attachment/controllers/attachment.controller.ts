import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AttachmentService } from '../services/attachment.service';

@ApiTags('Attachments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Post('cards/:cardId/attachments')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  upload(
    @Param('cardId', ParseIntPipe) cardId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.attachmentService.upload(cardId, file);
  }

  @Get('cards/:cardId/attachments')
  findAll(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.attachmentService.findAllByCard(cardId);
  }

  @Delete('attachments/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.attachmentService.remove(id);
  }
}
