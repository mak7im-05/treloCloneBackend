import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AttachmentService {
  constructor(private prisma: PrismaService) {}

  async create(cardId: number, filename: string, url: string) {
    return this.prisma.attachment.create({
      data: { filename, url, cardId },
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
    return this.prisma.attachment.delete({ where: { id } });
  }
}
