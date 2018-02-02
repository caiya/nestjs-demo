import * as passport from 'passport';
import { RequestMethod, Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { CatsController } from '../cats/cats.controller';
import { PhotosController } from '../photos/photos.controller';

@Module({
  components: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {

  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes(CatsController, PhotosController, {
      path: '/auth/authorized',    // 拦截所有url
      method: RequestMethod.GET
    });
  }

}