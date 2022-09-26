import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
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
    return this.usersRepository.save(newUser);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);

    return 'Successfull Delete';
  }
}