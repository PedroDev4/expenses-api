import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesAppService } from './Application/expenses.appservice';
import { User } from 'src/users/entities/User';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesAppService: ExpensesAppService) {}

  @Post()
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @CurrentUser() user: User,
  ) {
    return this.expensesAppService.create(user.id, createExpenseDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.expensesAppService.getAllUserExpenses(user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() { description, expenseDate, value }: UpdateExpenseDto,
  ) {
    return this.expensesAppService.update(id, user.id, {
      description,
      expenseDate,
      value,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesAppService.delete(id);
  }
}
