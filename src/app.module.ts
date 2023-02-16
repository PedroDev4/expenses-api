import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ExpensesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
