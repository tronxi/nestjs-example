import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailService } from "src/mail/mail.service";
import { Role } from "src/users/domain/models/role.model";
import { UserService } from "src/users/domain/services/user.service";
import { User } from "../../../../domain/models/user.model";
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";
import { Roles } from "../authorization/role.decorator";
import { RoleGuard } from "../authorization/role.guard";
import { CreateUserDto } from "../dto/create.user.dto";
import { UserDto } from "../dto/user.dto";
import { UserMapper } from "../mappers/user.mapper";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private mailService: MailService,
              private configService: ConfigService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<UserDto[]> {
    const userList: User[] = await this.userService.findAll();

    return UserMapper.mapToUserDtoList(userList);
  }

  @Get('/mail')
  async sendEmail() {
    const to = "sergio.gsanchez97@gmail.com";
    await this.mailService.send(to, 'lacontraseñaaleatoria');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user: User = await this.userService.findById(id);
    return UserMapper.mapToUserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('email') email: string): Promise<string> {
    return this.configService.get('MAIL_PASSWORD');
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
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
