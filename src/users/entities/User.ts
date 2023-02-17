import { User as UserInfra } from '@prisma/client';
import { Expense } from 'src/expenses/entities/Expenses';

export class User implements UserInfra {
  constructor(email: string, username: string, password: string) {
    this.email = email;
    (this.username = username), (this.password = password);
  }

  id?: string;
  email: string;
  username: string;
  password: string;
  expenses?: Array<Expense>;
}
