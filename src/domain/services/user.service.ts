import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserPersistence } from '../persistence/user.persistence';

@Injectable()
export class UserService {
  constructor(private userRepository: UserPersistence) {}

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  remove(id: string): Promise<void> {
    return this.userRepository.removeById(id);
  }
}
