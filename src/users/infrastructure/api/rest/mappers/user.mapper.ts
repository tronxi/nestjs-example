import { CreateUser } from "src/users/domain/models/create.user.model";
import { User } from "src/users/domain/models/user.model";
import { CreateUserDto } from "../dto/create.user.dto";
import { UserDto } from "../dto/user.dto";
import { RoleMapper } from "./role.mapper";

export class UserMapper {
  public static mapToUserDto(user: User): UserDto {
    const userDto: UserDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.password = '*****';
    userDto.isActive = user.isActive;
    userDto.roles = RoleMapper.mapToDtoList(user.roles);
    return userDto;
  }

  public static mapToUserDtoList(userList: User[]): UserDto[] {
    return userList.map(user => UserMapper.mapToUserDto(user));
  }

  public static mapToCreateUser(createUserDto: CreateUserDto): CreateUser {
    const createUser: CreateUser = new CreateUser();
    createUser.email = createUserDto.email;
    createUser.firstName = createUserDto.firstName;
    createUser.lastName = createUserDto.lastName;
    createUser.password = createUserDto.password;
    createUser.isActive = createUserDto.isActive;
    createUser.roles = RoleMapper.mapToDomainList(createUserDto.roles);
    return createUser;
  }
}
