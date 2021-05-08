import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(): UserEntity[] {
        return this.userService.findAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserEntity>{
        let user: UserEntity = await this.userService.findOne(id);
        if(user == null) 
        return this.userService.findOne(id);
    }

    @Delete(':id')
    deleteUserById(@Param('id') id: string): void {
        return this.userService.remove(id);
    }
 }
