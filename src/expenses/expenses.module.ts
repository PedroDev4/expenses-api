import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesRepository } from './Infrastructure/Repositories/expenses.repository';
import { UsersModule } from 'src/users/users.module';
import { ExpensesAppService } from './Application/expenses.appservice';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesRepository, ExpensesAppService],
  imports: [UsersModule],
})
export class ExpensesModule {}
