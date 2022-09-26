import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column ({nullable:false})
  username:string;

  @Column({ length: 64,nullable:false, unique:true})
  email:string;

  @Column ({nullable:false})
  password:string;

  @Column({nullable:false,unique:true})
  phonenumber:string;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}