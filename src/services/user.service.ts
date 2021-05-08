import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository) {}
    
    findAll(): UserEntity[] {
        return this.usersRepository.findAll();
      }
        
    findOne(id: string): Promise<UserEntity> {
        return this.usersRepository.findOne(id);
    }
        
    remove(id: string) {
        this.usersRepository.removeById(id);
    }

}
