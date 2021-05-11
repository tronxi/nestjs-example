import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToMany, JoinTable } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity()
@Unique(["email"])
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];
}
