/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/User';
import { IUserRepository } from './interfaces/IUserRepository';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

export const prisma = new PrismaClient();

@Injectable()
class UserRepository implements IUserRepository {
  
  async create({ email, expenses, password, username }: User): Promise<void> {
    await prisma.user.create({
      data: {
        email,
        username,
        password,
        expenses: {
          createMany: {
            data: expenses,
          },
        },
      },
    });
  }

  async findOne(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { expenses: true },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { expenses: false },
    });

    return user; 
  }
}

export { UserRepository };
