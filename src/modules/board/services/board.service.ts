import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(
    ownerId: number,
    data: { title: string; color?: string; imageUrl?: string },
  ) {
    const board = await this.prisma.board.create({
      data: {
        title: data.title,
        color: data.color,
        imageUrl: data.imageUrl,
        ownerId,
      },
    });

    await this.prisma.boardMember.create({
      data: { userId: ownerId, boardId: board.id, role: 'admin' },
    });

    return board;
  }

  async findAllByUser(userId: number) {
    return this.prisma.board.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        members: {
          include: { user: { select: { id: true, email: true, name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(boardId: number) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        lists: {
          orderBy: { order: 'asc' },
          include: {
            cards: { orderBy: { order: 'asc' } },
          },
        },
        labels: true,
        members: {
          include: { user: { select: { id: true, email: true, name: true } } },
        },
      },
    });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(
    boardId: number,
    data: {
      title?: string;
      color?: string;
      imageUrl?: string;
      isStarred?: boolean;
    },
  ) {
    await this.ensureExists(boardId);
    return this.prisma.board.update({
      where: { id: boardId },
      data,
    });
  }

  async remove(boardId: number) {
    await this.ensureExists(boardId);
    return this.prisma.board.delete({ where: { id: boardId } });
  }

  private async ensureExists(boardId: number) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }
}
