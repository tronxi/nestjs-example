import { UserEntity } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    // findOneById(id: string): User {
    //     return this.findOneById(id);
    // }

    findAll(): UserEntity[] {
        return this.findAll();
    }

    removeById(id: string) {
        this.delete(id);
    }
}