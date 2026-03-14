import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class BoardMemberService {
  constructor(private prisma: PrismaService) {}

  async getMembers(boardId: number) {
    return this.prisma.boardMember.findMany({
      where: { boardId },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  async addMember(boardId: number, userId: number, role = 'member') {
    const existing = await this.prisma.boardMember.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });
    if (existing) throw new ConflictException('User is already a member');

    return this.prisma.boardMember.create({
      data: { userId, boardId, role },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  async updateRole(boardId: number, userId: number, role: string) {
    const member = await this.prisma.boardMember.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });
    if (!member) throw new NotFoundException('Member not found');

    return this.prisma.boardMember.update({
      where: { userId_boardId: { userId, boardId } },
      data: { role },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  async removeMember(boardId: number, userId: number) {
    const member = await this.prisma.boardMember.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });
    if (!member) throw new NotFoundException('Member not found');
    if (member.role === 'admin') {
      const adminCount = await this.prisma.boardMember.count({
        where: { boardId, role: 'admin' },
      });
      if (adminCount <= 1) {
        throw new ForbiddenException('Cannot remove the last admin');
      }
    }
    return this.prisma.boardMember.delete({
      where: { userId_boardId: { userId, boardId } },
    });
  }

  async getMemberRole(boardId: number, userId: number): Promise<string | null> {
    const member = await this.prisma.boardMember.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });
    return member?.role ?? null;
  }

  async assignCard(cardId: number, userId: number) {
    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
      include: { list: true },
    });
    if (!card) throw new NotFoundException('Card not found');

    const member = await this.prisma.boardMember.findUnique({
      where: { userId_boardId: { userId, boardId: card.list.boardId } },
    });
    if (!member) {
      throw new ForbiddenException('User is not a member of this board');
    }

    return this.prisma.cardAssignee.upsert({
      where: { cardId_userId: { cardId, userId } },
      create: { cardId, userId },
      update: {},
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  async unassignCard(cardId: number, userId: number) {
    const existing = await this.prisma.cardAssignee.findUnique({
      where: { cardId_userId: { cardId, userId } },
    });
    if (!existing) throw new NotFoundException('Assignment not found');

    return this.prisma.cardAssignee.delete({
      where: { cardId_userId: { cardId, userId } },
    });
  }

  async getCardAssignees(cardId: number) {
    return this.prisma.cardAssignee.findMany({
      where: { cardId },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }
}
