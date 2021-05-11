import { Role } from "src/domain/models/role.model";
import { RoleDto } from "../dto/role.dto";

export class RoleMapper {
  public static mapToDto(role: Role): RoleDto {
    return role.toString() as RoleDto;
  }

  public static mapToDtoList(roles: Role[]): RoleDto[] {
    return roles.map(value => RoleMapper.mapToDto(value));
  }

  public static mapToDomain(roleDto: RoleDto): Role {
    return roleDto.toString() as Role;
  }

  public static mapToDomainList(rolesDto: RoleDto[]): Role[] {
    return rolesDto.map(value => RoleMapper.mapToDomain(value));
  }

}
