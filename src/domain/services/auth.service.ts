import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.findByEmail(email);
    if(user.password === password) return user;
    return null;
  }
}
