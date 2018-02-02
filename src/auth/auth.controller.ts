import { Controller, Post, Get } from "@nestjs/common";


@Controller('auth')
export class AuthController {

  @Post('authorized')
  async authorized() {
    
  }

}