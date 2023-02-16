import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesRepository } from './Infrastructure/Repositories/expenses.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesRepository],
  imports: [UsersModule],
})
export class ExpensesModule {}
