import { User } from '../models/user.model';

export abstract class UserPersistence {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
  abstract removeById(id: string): Promise<void>;
}
