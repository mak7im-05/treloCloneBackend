import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { BoardMemberService } from '../services/board-member.service';

@Injectable()
export class BoardRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private boardMemberService: BoardMemberService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<{
      user: { id: number };
      params: Record<string, string>;
    }>();
    const userId = request.user.id;

    const boardId =
      parseInt(request.params['boardId']) ||
      parseInt(request.params['id']) ||
      0;

    if (!boardId) return true;

    const role = await this.boardMemberService.getMemberRole(boardId, userId);

    if (!role) {
      throw new ForbiddenException('You are not a member of this board');
    }

    if (!requiredRoles || requiredRoles.length === 0) return true;

    if (!requiredRoles.includes(role)) {
      throw new ForbiddenException(
        `Requires one of roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
