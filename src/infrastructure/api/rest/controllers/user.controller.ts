import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from 'src/domain/services/user.service';
import { User } from '../../../../domain/models/user.model';
import { CreateUserDto } from '../dto/create.user.dto';
import { CreateUser } from "../../../../domain/models/create.user.model";
import { UserDto } from "../dto/user.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    const userList: User[] = await this.userService.findAll();
    return this.mapToUserDtoList(userList);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user: User = await this.userService.findById(id);
    return this.mapToUserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user: User = await this.userService.create(this.mapToCreateUser(createUserDto));
    return this.mapToUserDto(user);
  }

  private mapToUserDto(user: User): UserDto {
    const userDto: UserDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.password = '*****';
    userDto.isActive = user.isActive;
    return userDto;
  }

  private mapToUserDtoList(userList: User[]): UserDto[] {
    return userList.map(user => this.mapToUserDto(user));
  }

  private mapToCreateUser(createUserDto: CreateUserDto): CreateUser {
    const createUser: CreateUser = new CreateUser();
    createUser.email = createUserDto.email;
    createUser.firstName = createUserDto.firstName;
    createUser.lastName = createUserDto.lastName;
    createUser.password = createUserDto.password;
    createUser.isActive = createUserDto.isActive;
    return createUser;
  }
}
