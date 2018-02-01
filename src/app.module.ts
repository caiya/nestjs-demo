import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';

import { CarsModule } from './cats/cats.module';

import { LoggerMiddleware, loggerMiddleware } from './common/middlewares/logger.middleware'
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CarsModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule implements NestModule {

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
