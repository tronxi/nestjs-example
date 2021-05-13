import { RoleDto } from "./role.dto";

export class UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  roles: RoleDto[];
}
