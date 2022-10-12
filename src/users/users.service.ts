import { ForbiddenException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUser } from './dtos/create-user.dto';
import { Roles } from 'src/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {    
    var response = this.usersRepository.findOneByOrFail({id: id})
        .catch(error=>{
          Logger.log(error);
          throw new ForbiddenException({error: "User not found"});
        });
    return response;
  }

  async signIn(email: string) {
    const user: User = await this.usersRepository.createQueryBuilder('user')
    .select(['user.phonenumber', 'user.id', 'user.username', 'user.password'])
    .leftJoinAndSelect('user.roles', 'roles')
    .where('email=:mail',{mail: email})
    .getOneOrFail()
    .catch((error) => {
        Logger.warn(error)
      if (error instanceof EntityNotFoundError) {
          throw new UnauthorizedException({
            error: 'Incorrect email or password',
          });
        }
      throw new InternalServerErrorException({error: 'An error occured while processing your request'})
    });
    Logger.log(user.roles[0].rolename);
    return user;
  }

  async save(user: CreateUser, userRole: string){
    const role = await this.rolesRepository.find({where:{rolename: userRole}})
      .catch(error=>{
        Logger.log(error);
        throw new InternalServerErrorException({error: "An error occured while processing your request"});
      })
    const newUser = this.usersRepository.create(
      {
        username: user.username,
        email: user.email,
        password: user.password,
        phonenumber: user.phonenumber,
        roles: role
      }
      );
    var response = await this.usersRepository.save(newUser);
    return response.id;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.usersRepository.delete(id);
    return 'Successfull Delete';
  }
}