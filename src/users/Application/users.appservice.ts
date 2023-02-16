/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class UsersAppService {
  constructor(private readonly usersService: UsersService) {}

  async create({ email,  password, username }: CreateUserDto) {
    const user = await this.usersService.findByEmail(email);

    if(user) {
      throw new Error('User already exists!');
    }

    const cryptedPassword = await hash(password, 8);

    await this.usersService.create({email, password: cryptedPassword, username});
  }

  async findOne(id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

}
