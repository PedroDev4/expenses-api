import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesRepository } from './Infrastructure/Repositories/expenses.repository';
import { UsersModule } from 'src/users/users.module';
import { ExpensesAppService } from './Application/expenses.appservice';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  imports: [UsersModule, ProvidersModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesRepository, ExpensesAppService],
})
export class ExpensesModule {}
