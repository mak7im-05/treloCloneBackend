import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(boardId: number, data: { title: string }) {
    const maxOrder = await this.prisma.list.aggregate({
      where: { boardId },
      _max: { order: true },
    });
    const order = (maxOrder._max.order ?? -1) + 1;

    return this.prisma.list.create({
      data: { title: data.title, boardId, order },
    });
  }

  async findAllByBoard(boardId: number) {
    return this.prisma.list.findMany({
      where: { boardId },
      orderBy: { order: 'asc' },
      include: {
        cards: { orderBy: { order: 'asc' } },
      },
    });
  }

  async findOne(listId: number) {
    const list = await this.prisma.list.findUnique({
      where: { id: listId },
      include: { cards: { orderBy: { order: 'asc' } } },
    });
    if (!list) throw new NotFoundException('List not found');
    return list;
  }

  async update(listId: number, data: { title?: string }) {
    await this.ensureExists(listId);
    return this.prisma.list.update({ where: { id: listId }, data });
  }

  async remove(listId: number) {
    await this.ensureExists(listId);
    return this.prisma.list.delete({ where: { id: listId } });
  }

  async reorder(boardId: number, orderedIds: number[]) {
    const updates = orderedIds.map((id, index) =>
      this.prisma.list.update({ where: { id }, data: { order: index } }),
    );
    await this.prisma.$transaction(updates);
    return this.findAllByBoard(boardId);
  }

  private async ensureExists(listId: number) {
    const list = await this.prisma.list.findUnique({ where: { id: listId } });
    if (!list) throw new NotFoundException('List not found');
    return list;
  }
}
