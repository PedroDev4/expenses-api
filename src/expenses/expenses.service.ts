import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/Expenses';
import { ExpensesRepository } from './Infrastructure/Repositories/expenses.repository';

@Injectable()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async create({
    description,
    expenseDate,
    userId,
    value,
  }: CreateExpenseDto): Promise<void> {
    await this.expensesRepository.create({
      description,
      expenseDate,
      userId,
      value,
    });
  }

  async findAll(userId: string): Promise<Expense[]> {
    const expenses = await this.expensesRepository.findAll(userId);
    return expenses;
  }

  async update(
    id: string,
    { description, expenseDate, userId, value }: UpdateExpenseDto,
  ): Promise<void> {
    await this.expensesRepository.update({
      id,
      description,
      expenseDate,
      userId,
      value,
    });
  }

  async remove(id: string): Promise<void> {
    await this.expensesRepository.delete(id);
  }
}
