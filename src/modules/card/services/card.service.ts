import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async create(listId: number, data: { title: string; description?: string }) {
    const maxOrder = await this.prisma.card.aggregate({
      where: { listId },
      _max: { order: true },
    });
    const order = (maxOrder._max.order ?? -1) + 1;

    return this.prisma.card.create({
      data: { title: data.title, description: data.description, listId, order },
    });
  }

  async findAllByList(listId: number) {
    return this.prisma.card.findMany({
      where: { listId },
      orderBy: { order: 'asc' },
      include: {
        labels: { include: { label: true } },
        assignees: {
          include: { user: { select: { id: true, email: true, name: true } } },
        },
      },
    });
  }

  async findOne(cardId: number) {
    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, email: true, name: true } },
          },
        },
        attachments: true,
        labels: { include: { label: true } },
        assignees: {
          include: { user: { select: { id: true, email: true, name: true } } },
        },
      },
    });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async update(
    cardId: number,
    data: { title?: string; description?: string; status?: string },
  ) {
    await this.ensureExists(cardId);
    return this.prisma.card.update({ where: { id: cardId }, data });
  }

  async remove(cardId: number) {
    await this.ensureExists(cardId);
    return this.prisma.card.delete({ where: { id: cardId } });
  }

  async move(cardId: number, targetListId: number, order: number) {
    await this.ensureExists(cardId);
    return this.prisma.card.update({
      where: { id: cardId },
      data: { listId: targetListId, order },
    });
  }

  async reorder(listId: number, orderedIds: number[]) {
    const updates = orderedIds.map((id, index) =>
      this.prisma.card.update({
        where: { id },
        data: { order: index, listId },
      }),
    );
    await this.prisma.$transaction(updates);
    return this.findAllByList(listId);
  }

  private async ensureExists(cardId: number) {
    const card = await this.prisma.card.findUnique({ where: { id: cardId } });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }
}
