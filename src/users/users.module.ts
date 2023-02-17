import { Module } from '@nestjs/common';
import { UsersAppService } from './Application/users.appservice';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './Infrastructure/Repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersAppService, UserRepository],
  exports: [UsersService, UsersAppService, UserRepository],
})
export class UsersModule {}
