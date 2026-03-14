import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchCards(
    boardId: number,
    options: {
      q?: string;
      status?: string;
      labelId?: number;
      assigneeId?: number;
      skip?: number;
      take?: number;
    },
  ) {
    const { q, status, labelId, assigneeId, skip = 0, take = 20 } = options;

    const where: Prisma.CardWhereInput = {
      list: { boardId },
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' as const } },
          { description: { contains: q, mode: 'insensitive' as const } },
        ],
      }),
      ...(status && { status }),
      ...(labelId && { labels: { some: { labelId } } }),
      ...(assigneeId && { assignees: { some: { userId: assigneeId } } }),
    };

    const [cards, total] = await Promise.all([
      this.prisma.card.findMany({
        where,
        skip,
        take,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          order: true,
          listId: true,
          list: { select: { title: true } },
          labels: { select: { label: { select: { id: true, name: true, color: true } } } },
        },
      }),
      this.prisma.card.count({ where }),
    ]);

    return { cards, total, skip, take };
  }

  async searchBoards(userId: number, q: string) {
    return this.prisma.board.findMany({
      where: {
        members: { some: { userId } },
        title: { contains: q, mode: 'insensitive' },
      },
      select: {
        id: true,
        title: true,
        color: true,
        imageUrl: true,
        isStarred: true,
      },
      take: 10,
    });
  }
}
