import { Expenses as ExpenseInfra } from '@prisma/client';

export class Expense implements ExpenseInfra {
  constructor(description: string, value: number) {
    (this.description = description), (this.value = value);
  }

  id?: string;
  description: string;
  expenseDate: Date;
  value: number;
  userId: string;
}
