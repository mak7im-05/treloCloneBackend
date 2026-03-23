import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class LabelService {
  constructor(private prisma: PrismaService) {}

  async create(boardId: number, data: { name: string; color: string }) {
    return this.prisma.label.create({
      data: { name: data.name, color: data.color, boardId },
    });
  }

  async findAllByBoard(boardId: number) {
    return this.prisma.label.findMany({
      where: { boardId },
      orderBy: { id: 'asc' },
    });
  }

  async update(id: number, data: { name?: string; color?: string }) {
    await this.ensureExists(id);
    return this.prisma.label.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.label.delete({ where: { id } });
  }

  async addToCard(cardId: number, labelId: number) {
    return this.prisma.cardLabel.create({
      data: { cardId, labelId },
      include: { label: true },
    });
  }

  async removeFromCard(cardId: number, labelId: number) {
    return this.prisma.cardLabel.delete({
      where: { cardId_labelId: { cardId, labelId } },
    });
  }

  private async ensureExists(id: number) {
    const label = await this.prisma.label.findUnique({ where: { id } });
    if (!label) throw new NotFoundException('Label not found');
    return label;
  }
}
