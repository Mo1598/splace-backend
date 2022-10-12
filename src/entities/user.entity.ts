import { Role } from 'src/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, JoinTable, ManyToMany } from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column ({nullable:false})
  username:string;

  @Column({ length: 64,nullable:false, unique:true})
  email:string;

  @Column ({nullable:false})
  password:string;

  @Column({nullable:false,unique:true})
  phonenumber:string;

  // @Column({type: 'enum', enum:Role, default: Role.User})
  // roles: Role;

  @ManyToMany(()=>Roles, {eager: true})
    @JoinTable({
        name: "user_roles",
    })
    roles: Roles[]

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}