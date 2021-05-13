import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
