import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller()
export class LoginController {
  constructor(private jwtService: JwtService) {
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const payload = { email: req.user.email, sub: req.user.id, role: req.user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
