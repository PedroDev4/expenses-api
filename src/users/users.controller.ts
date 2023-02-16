import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersAppService } from './Application/users.appservice';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersAppService: UsersAppService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersAppService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersAppService.findOne(+id);
  }
}
