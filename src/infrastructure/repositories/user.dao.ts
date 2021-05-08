import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user.model';
import { UserRepository } from './user.repository';
import { UserPersistence } from '../../domain/persistence/user.persistence';

@Injectable()
export class UserDao implements UserPersistence{
  constructor(private userRepository: UserRepository) {}
  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  removeById(id: string): Promise<void> {
    return this.userRepository.removeById(id);
  }
}
