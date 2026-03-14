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
import { diskStorage } from 'multer';
import { extname } from 'path';
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
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  upload(
    @Param('cardId', ParseIntPipe) cardId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = `/uploads/${file.filename}`;
    return this.attachmentService.create(cardId, file.originalname, url);
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
