import { Component } from "@nestjs/common";

import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from "./auth.service";

@Component()
export class JwtStrategy extends Strategy {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: 'secret',
    }, async (req, plyload, next) => await this.verify(req, plyload, next));
    passport.use(this);
  };

  // jwt认证通过会执行此回调
  public async verify(req, plyload, done) {
    const isValid = await this.authService.validateUser(plyload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, plyload);
  }

}