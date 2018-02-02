import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';

import { CatsModule } from './cats/cats.module';

import { LoggerMiddleware, loggerMiddleware } from './common/middlewares/logger.middleware'
import { CatsController } from './cats/cats.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PhotosModule } from './photos/photos.module';

import { MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

// 
@Module({
  imports: [TypeOrmModule.forRoot(), MongooseModule.forRoot('mongodb://192.168.20.5/test'), AuthModule ,CatsModule, PhotosModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule implements NestModule {
  
  // constructor(private readonly connection: Connection){};

  configure(consumer: MiddlewaresConsumer): void {
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: '/cats', method: RequestMethod.GET
    // }, {
    //   path: '/cats', method: RequestMethod.POST
    // })

    consumer.apply(LoggerMiddleware).with('ApplicationModule').forRoutes(CatsController);
    consumer.apply(loggerMiddleware).forRoutes(CatsController);

    // path: '/cats', method: RequestMethod.ALL
  }
}
