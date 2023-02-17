import { UsersAppService } from 'src/users/Application/users.appservice';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { Expense } from '../entities/Expenses';
import { ExpensesService } from '../expenses.service';
import { resolve } from 'path';
import { EtherealMailProvider } from 'src/providers/EmailProvider/EtherealMailProvider';
export class ExpensesAppService {
  constructor(
    private readonly etherealMailProvider: EtherealMailProvider,
    private readonly expensesService: ExpensesService,
    private readonly userAppService: UsersAppService,
  ) {}

  async create(
    userId: string,
    { description, expenseDate, value }: CreateExpenseDto,
  ): Promise<void> {
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'providers',
      'views',
      'emails',
      'NewExpenseCreated.hbs',
    );

    const user = await this.userAppService.findOne(userId);

    await this.expensesService.create(userId, {
      description,
      expenseDate,
      value,
    });

    const emailVariables = {
      username: user.username,
      expenseDate: expenseDate,
      description: description,
      value: value,
    };

    await this.etherealMailProvider.sendEmail(
      user.email,
      'New Expense Created!',
      emailVariables,
      templatePath,
    );
  }

  async getAllUserExpenses(userId: string): Promise<Expense[]> {
    const userExpenses = await this.expensesService.findAll(userId);

    return userExpenses;
  }

  async update(
    id: string,
    userId: string,
    { description, expenseDate, value }: UpdateExpenseDto,
  ): Promise<void> {
    await this.expensesService.update(id, userId, {
      description,
      expenseDate,
      value,
    });
  }

  async delete(id: string): Promise<void> {
    await this.expensesService.remove(id);
  }
}
