import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {

  async resolve(...args: any[]): Promise<ExpressMiddleware> {

    // ...do some async func, eg: await someAsyncFn();

    return async (req, res, next) => {
      console.log('args:', args);
      next();
    }
  }

}

// middleware简化版写法
export const loggerMiddleware = (req, res, next) => {
  console.log('Simple Requests...');
  next();
}
