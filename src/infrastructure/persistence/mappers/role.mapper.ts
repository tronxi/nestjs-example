import { Role } from "src/domain/models/role.model";
import { RoleEntity } from "../entities/role.entity";

export class RoleMapper {

  public static mapToRole(roleEntity: RoleEntity): Role {
    return roleEntity.name as Role;
  }

  public static mapToRoleList(roleEntities: RoleEntity[]): Role[] {
    return roleEntities.map(value => RoleMapper.mapToRole(value));
  }
}
