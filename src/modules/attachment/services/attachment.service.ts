import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { S3Service } from './s3.service';

@Injectable()
export class AttachmentService {
  constructor(
    private prisma: PrismaService,
    private s3: S3Service,
  ) {}

  async upload(cardId: number, file: Express.Multer.File) {
    const url = await this.s3.upload(file);
    return this.prisma.attachment.create({
      data: { filename: file.originalname, url, cardId },
    });
  }

  async findAllByCard(cardId: number) {
    return this.prisma.attachment.findMany({
      where: { cardId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: number) {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id },
    });
    if (!attachment) throw new NotFoundException('Attachment not found');

    await this.s3.delete(attachment.url);
    return this.prisma.attachment.delete({ where: { id } });
  }
}
