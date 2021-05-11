import { EntityRepository, Repository } from "typeorm";
import { RoleEntity } from "../entities/role.entity";

@EntityRepository(RoleEntity)
export class RoleRepositoryTypeOrm extends Repository<RoleEntity> {
  findByName(name: string): Promise<RoleEntity> {
    return this.findOne({
      where: [
        {name: name}
      ]
    });
  }
}
