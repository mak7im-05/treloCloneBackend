import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(cardId: number, authorId: number, body: string) {
    return this.prisma.comment.create({
      data: { body, cardId, authorId },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
  }

  async findAllByCard(cardId: number) {
    return this.prisma.comment.findMany({
      where: { cardId },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
  }

  async remove(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.prisma.comment.delete({ where: { id: commentId } });
  }
}
