import { IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateExpenseDto {
  @MaxLength(191)
  @IsString()
  description: string;

  expenseDate: Date;

  @IsPositive()
  value: number;
  userId: string;
}
