import { Expenses as ExpenseInfra } from '@prisma/client';

export class Expense implements ExpenseInfra {
  id?: string;
  description: string;
  expenseDate: Date;
  value: number;
  userId: string;
}
