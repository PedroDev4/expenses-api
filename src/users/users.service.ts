import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './Infrastructure/Repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create({ email, password, username }: CreateUserDto): Promise<void> {
    await this.usersRepository.create({
      email,
      password,
      username,
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }
}
