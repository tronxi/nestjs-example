import { Injectable } from "@nestjs/common";
import { User } from "../../../domain/models/user.model";
import { UserRepositoryTypeOrm } from "./user.repository.type.orm";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { CreateUser } from "../../../domain/models/create.user.model";
import { UserEntity } from "../entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { RoleRepositoryTypeOrm } from "./role.repository.type.orm";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
  constructor(private userRepositoryTypeOrm: UserRepositoryTypeOrm,
              private roleRepositoryTypeOrm: RoleRepositoryTypeOrm) {}
  async findAll(): Promise<User[]> {
    const userEntities: UserEntity[] = await this.userRepositoryTypeOrm.findAll();
    return UserMapper.mapList(userEntities);
  }

  async findById(id: string): Promise<User> {
    const userEntity: UserEntity = await this.userRepositoryTypeOrm.findById(id);
    if (userEntity === undefined) return undefined;
    return UserMapper.mapToUser(userEntity);
  }

  async findByEmail(email: string): Promise<User> {
    const userEntity: UserEntity = await this.userRepositoryTypeOrm.findByEmail(email);
    if (userEntity === undefined) return undefined;
    return UserMapper.mapToUser(userEntity);
  }

  removeById(id: string): Promise<void> {
    return this.userRepositoryTypeOrm.removeById(id);
  }

  async create(createUser: CreateUser): Promise<User> {
    const userEntity: UserEntity = await UserMapper.mapToEntity(createUser);
    userEntity.roles = await Promise.all(createUser.roles.map((role) => this.roleRepositoryTypeOrm.findByName(role)));
    const createdUserEntity = await this.userRepositoryTypeOrm.createUser(userEntity);
    return UserMapper.mapToUser(createdUserEntity);
  }
}
