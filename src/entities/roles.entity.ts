import Permissions from "src/enums/permissions/permission.type";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Roles
{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:false})
    rolename:string;

    @Column({type: 'enum', enum:Permissions, array: true, default: []})
    permissions: Permissions[]

    @CreateDateColumn()
    createdAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

}