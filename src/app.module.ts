import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoardModule } from './modules/board/board.module';
import { ListModule } from './modules/list/list.module';
import { CardModule } from './modules/card/card.module';
import { CommentModule } from './modules/comment/comment.module';
import { AppGraphQLModule } from './modules/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    BoardModule,
    ListModule,
    CardModule,
    CommentModule,
    AppGraphQLModule,
  ],
})
export class AppModule {}
