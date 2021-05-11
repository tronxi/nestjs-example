import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/domain/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    let user = null;
    try {
      user = await this.authService.validateUser(email, password);
    } catch (error) {
      throw new UnauthorizedException();
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
