import { ForbiddenException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    return user;
  }

  save(user){
    const newUser = this.usersRepository.create(
      {
        username: user.username,
        email: user.email,
        password: user.password,
        phonenumber: user.phonenumber
      }
      );
    var response = this.usersRepository.save(newUser);
    return "User saved successfully";
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.usersRepository.delete(id);
    return 'Successfull Delete';
  }
}