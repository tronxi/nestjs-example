import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { CreateUser } from '../models/create.user.model';
import { DomainException } from '../exception/domain.exception';
import { UserNotFoundExeption } from '../exception/user.not.found.exeption';
import { UserAlreadyExistException } from '../exception/user.already.exist.exception';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user: User = await this.userRepository.findById(id);
    if(user === undefined) throw new UserNotFoundExeption('user with id: ' + id + ' not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findByEmail(email);
    if(user === undefined) throw new UserNotFoundExeption('user with email: ' + email + ' not found');
    return user;
  }

  async remove(id: string): Promise<void> {
    const user: User = await this.userRepository.findById(id);
    if(user === undefined) throw new UserNotFoundExeption('user with id: ' + id + ' not found');
    return this.userRepository.removeById(id);
  }

  async create(createUser: CreateUser): Promise<User> {
    const user: User = await this.userRepository.findByEmail(createUser.email);
    if(user !== undefined) throw new UserAlreadyExistException('user with email: ' + createUser.email + ' already exist');
    return this.userRepository.create(createUser);
  }
}
