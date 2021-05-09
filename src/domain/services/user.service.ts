import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { CreateUser } from '../models/create.user.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  remove(id: string): Promise<void> {
    return this.userRepository.removeById(id);
  }

  create(createUser: CreateUser): Promise<User> {
    return this.userRepository.create(createUser);
  }
}
