import { UserEntity } from "../entities/user.entity";
import { RoleMapper } from "./role.mapper";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/domain/models/user.model";
import { CreateUser } from "src/users/domain/models/create.user.model";

export class UserMapper {
  public static mapToEntity(createUser: CreateUser): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.email = createUser.email;
    userEntity.firstName = createUser.firstName;
    userEntity.lastName = createUser.lastName;
    userEntity.password = bcrypt.hashSync(createUser.password, 10);
    userEntity.isActive = createUser.isActive;
    return userEntity;
  }

  public static mapToUser(userEntity: UserEntity): User {
    const user: User = new User();
    user.id = userEntity.id;
    user.email = userEntity.email;
    user.firstName = userEntity.firstName;
    user.lastName = userEntity.lastName;
    user.password = userEntity.password;
    user.isActive = userEntity.isActive;
    user.roles = RoleMapper.mapToRoleList(userEntity.roles);
    return user;
  }

  public static mapList(userEntities: UserEntity[]): User[] {
    return userEntities.map((user) => UserMapper.mapToUser(user));
  }
}
