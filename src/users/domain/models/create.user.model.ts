import { Role } from "./role.model";

export class CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  roles: Role[];
}
