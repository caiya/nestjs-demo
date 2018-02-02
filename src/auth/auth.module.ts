import * as passport from 'passport';
import { RequestMethod, Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  components: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {

  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes({
      path: '/auth/authorized',
      method: RequestMethod.ALL
    });
  }
  
}