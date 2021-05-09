import { UserEntity } from 'src/infrastructure/persistence/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepositoryTypeOrm extends Repository<UserEntity> {
  findAll(): Promise<UserEntity[]> {
    return this.find();
  }

  findById(id: string): Promise<UserEntity> {
    return this.findOne(id);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.findOne(  {where: [
      { email: email }
    ]})
  }

  async removeById(id: string): Promise<void> {
    await this.delete(id);
  }

  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    return this.save(userEntity);
  }
}
