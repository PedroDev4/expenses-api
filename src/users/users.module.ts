import { Module } from '@nestjs/common';
import { UsersAppService } from './Application/users.appservice';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersAppService],
})
export class UsersModule {}
