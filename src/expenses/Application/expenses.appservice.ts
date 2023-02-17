import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { Expense } from '../entities/Expenses';
import { ExpensesService } from '../expenses.service';

export class ExpensesAppService {
  constructor(private readonly expensesService: ExpensesService) {}

  async create({
    description,
    expenseDate,
    userId,
    value,
  }: CreateExpenseDto): Promise<void> {
    await this.expensesService.create({
      description,
      expenseDate,
      userId,
      value,
    });
  }

  async getAllUserExpenses(userId: string): Promise<Expense[]> {
    const userExpenses = await this.expensesService.findAll(userId);

    return userExpenses;
  }

  async update(
    id: string,
    { description, expenseDate, userId, value }: UpdateExpenseDto,
  ): Promise<void> {
    await this.expensesService.update(id, {
      description,
      expenseDate,
      userId,
      value,
    });
  }

  async delete(id: string): Promise<void> {
    await this.expensesService.remove(id);
  }
}
