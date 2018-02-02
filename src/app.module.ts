import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware, loggerMiddleware } from './common/middlewares/logger.middleware'
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PhotosModule } from './photos/photos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { graphqlExpress } from 'apollo-server-express';

// 
@Module({
  imports: [TypeOrmModule.forRoot(), MongooseModule.forRoot('mongodb://192.168.20.5/test'), AuthModule, CatsModule, PhotosModule, GraphQLModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule implements NestModule {

  constructor(private readonly graphQLFactory: GraphQLFactory) { };


  configure(consumer: MiddlewaresConsumer): void {

    // 添加日志中间件
    consumer.apply(LoggerMiddleware).with('ApplicationModule').forRoutes(CatsController);
    consumer.apply(loggerMiddleware).forRoutes(CatsController);

    // 添加graphql中间件
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');   // 加载graphql定义文件
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    consumer.apply(graphqlExpress(req => ({ schema, rootValue: req }))).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL
    });
    // path: '/cats', method: RequestMethod.ALL
  }
}
