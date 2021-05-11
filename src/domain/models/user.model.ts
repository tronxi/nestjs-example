import { Role } from "./role.model";

export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  roles: Role[];
}
