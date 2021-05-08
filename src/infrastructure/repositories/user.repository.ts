import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../domain/models/user.model';
import { UserPersistence } from '../../domain/persistence/user.persistence';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements UserPersistence{
  async findById(id: string): Promise<User> {
    console.log('buscando');
    const userEntity: UserEntity = await this.findOneOrFail(id);
    console.log('lo tengo');
    return this.map(userEntity);
  }

  async findAll(): Promise<User[]> {
    const userEntities: UserEntity[] = await this.find();
    return this.mapList(userEntities);
  }

  async removeById(id: string): Promise<void> {
    await this.delete(id);
  }

  private map(userEntity: UserEntity): User {
    const user: User = new User();
    user.id = userEntity.id;
    user.firstName = userEntity.firstName;
    user.lastName = userEntity.lastName;
    user.isActive = userEntity.isActive;
    console.log('el user');
    console.log(user);
    return user;
  }

  private mapList(userEntities: UserEntity[]): User[] {
    return userEntities.map((user) => this.map(user));
  }
}
