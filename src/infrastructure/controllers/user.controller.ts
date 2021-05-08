import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { UserService } from 'src/domain/services/user.service';
import { User } from '../../domain/models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    console.log(id);
    return this.userService.findById(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
