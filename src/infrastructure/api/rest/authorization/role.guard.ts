import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { Role } from "src/domain/models/role.model";
import { ROLES_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => request.user.role?.includes(role));
  }

}
