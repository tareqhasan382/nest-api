import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userData = this.userRepository.create(createUserDto)
    return await this.userRepository.save(userData);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existuser = await this.userRepository.findOne({where:{id}});
    if(!existuser){
      throw new NotFoundException();
    }
    Object.assign(existuser,updateUserDto)
    return await this.userRepository.save(existuser);
  }

  async remove(id: number) {
    const existuser = await this.userRepository.findOne({where:{id}});
    if(!existuser){
      throw new NotFoundException();
    }
    return await this.userRepository.remove(existuser);
  }
}
