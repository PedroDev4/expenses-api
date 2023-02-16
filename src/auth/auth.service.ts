import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { User } from 'src/users/entities/User';
import { JwtUserPayload } from './Models/JwtUserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './Models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const jwtPayload: JwtUserPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const jwtToken = this.jwtService.sign(jwtPayload);

    return {
      acess_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email or password provided is incorrect');
  }
}
