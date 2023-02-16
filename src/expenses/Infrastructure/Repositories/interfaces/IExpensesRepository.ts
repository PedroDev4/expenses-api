import { Expense } from 'src/expenses/entities/Expenses';

export interface IExpensesRepository {
  create(expense: Expense): Promise<void>;
  findAll(userId: string): Promise<Expense[]>;
  update(expense: Expense): Promise<void>;
  delete(expenseId: string): Promise<void>;
}
