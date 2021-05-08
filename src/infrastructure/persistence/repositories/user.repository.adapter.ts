import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/models/user.model';
import { UserRepositoryTypeOrm } from './user.repository.type.orm';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { CreateUser } from '../../../domain/models/create.user.model';
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
  constructor(private userRepositoryTypeOrm: UserRepositoryTypeOrm) {}
  async findAll(): Promise<User[]> {
    const userEntities: UserEntity[] = await this.userRepositoryTypeOrm.findAll();
    return this.mapList(userEntities);
  }

  async findById(id: string): Promise<User> {
    const userEntity: UserEntity = await this.userRepositoryTypeOrm.findById(id);
    return this.mapToUser(userEntity);
  }

  removeById(id: string): Promise<void> {
    return this.userRepositoryTypeOrm.removeById(id);
  }

  async create(createUser: CreateUser): Promise<User> {
    const userEntity: UserEntity = await this.userRepositoryTypeOrm.createUser(this.mapToEntity(createUser));
    return this.mapToUser(userEntity);
  }

  private mapToEntity(createUser: CreateUser): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.firstName = createUser.firstName;
    userEntity.lastName = createUser.lastName;
    userEntity.password = createUser.password;
    userEntity.isActive = createUser.isActive;
    return userEntity;
  }

  private mapToUser(userEntity: UserEntity): User {
    const user: User = new User();
    user.id = userEntity.id;
    user.firstName = userEntity.firstName;
    user.lastName = userEntity.lastName;
    user.password = userEntity.password;
    user.isActive = userEntity.isActive;
    return user;
  }

  private mapList(userEntities: UserEntity[]): User[] {
    return userEntities.map((user) => this.mapToUser(user));
  }
}
