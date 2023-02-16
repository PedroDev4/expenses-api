import { User as UserInfra } from '@prisma/client';
import { Expense } from 'src/expenses/entities/Expenses';

export class User implements UserInfra {
  id?: string;
  email: string;
  username: string;
  password: string;
  expenses?: Array<Expense>;
}
