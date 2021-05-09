import { User } from '../models/user.model';
import { CreateUser } from '../models/create.user.model';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract removeById(id: string): Promise<void>;
  abstract create(createUser: CreateUser): Promise<User>;
}
