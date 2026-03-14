import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BoardResolver } from './resolvers/board.resolver';
import { ListResolver } from './resolvers/list.resolver';
import { CardResolver } from './resolvers/card.resolver';
import { BoardModule } from '../board/board.module';
import { ListModule } from '../list/list.module';
import { CardModule } from '../card/card.module';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      path: '/graphql',
    }),
    BoardModule,
    ListModule,
    CardModule,
  ],
  providers: [BoardResolver, ListResolver, CardResolver],
})
export class AppGraphQLModule {}
