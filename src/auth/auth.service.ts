import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

@Component()
export class AuthService {

  async createToken() {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const user = {
      email: 'thisis@example.com'
    };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    }
  }

  async validateUser(signedUser) : Promise<boolean> {

    // 这里放置一些用户校验层的逻辑，比如用户是否存在等
    return true;
  }
}
