import { UserEntity } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepositoryTypeOrm extends Repository<UserEntity> {
  findAll(): Promise<UserEntity[]> {
    return this.find({relations: ['roles']});
  }

  findById(id: string): Promise<UserEntity> {
    return this.findOne({
      relations: ['roles'],
      where: [
        { id: id }
      ]});
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.findOne(  {
      relations: ['roles'],
      where: [
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
