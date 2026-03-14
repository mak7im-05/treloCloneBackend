import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoardModule } from './modules/board/board.module';
import { ListModule } from './modules/list/list.module';
import { CardModule } from './modules/card/card.module';
import { CommentModule } from './modules/comment/comment.module';
import { AppGraphQLModule } from './modules/graphql/graphql.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    BoardModule,
    ListModule,
    CardModule,
    CommentModule,
    AppGraphQLModule,
    AttachmentModule,
    SearchModule,
  ],
})
export class AppModule {}
