import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "src/domain/services/user.service";
import { User } from "../../../../domain/models/user.model";
import { CreateUserDto } from "../dto/create.user.dto";
import { UserDto } from "../dto/user.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UserMapper } from "../mappers/user.mapper";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<UserDto[]> {
    const userList: User[] = await this.userService.findAll();
    return UserMapper.mapToUserDtoList(userList);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user: User = await this.userService.findById(id);
    return UserMapper.mapToUserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user: User = await this.userService.create(UserMapper.mapToCreateUser(createUserDto));
    return UserMapper.mapToUserDto(user);
  }
}
