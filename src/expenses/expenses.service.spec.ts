import { Test, TestingModule } from '@nestjs/testing';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/Expenses';
import { ExpensesService } from './expenses.service';
import { ExpensesRepository } from './Infrastructure/Repositories/expenses.repository';

const expensesEntityList = [
  new Expense('gasto', 12345),
  new Expense('gasto2', 12),
  new Expense('gasto3', 123),
  new Expense('gasto4', 15),
];

describe('ExpensesService', () => {
  let expenseService: ExpensesService;
  let expensesRepository: ExpensesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: ExpensesRepository,
          useValue: {
            create: jest.fn().mockReturnValue(expensesEntityList[0]),
            findAll: jest.fn().mockResolvedValue(expensesEntityList),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    expenseService = module.get<ExpensesService>(ExpensesService);
    expensesRepository = module.get<ExpensesRepository>(ExpensesRepository);
  });

  it('should be defined', () => {
    expect(expenseService).toBeDefined();
    expect(expensesRepository).toBeDefined();
  });

  describe('Find All ', () => {
    it('should return a list of expenses successufully', async () => {
      const result = await expenseService.findAll('xpto');

      expect(result).toEqual(expensesEntityList);
      expect(expensesRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  it('Should throw an exception', () => {
    // Arrange
    jest
      .spyOn(expensesRepository, 'findAll')
      .mockRejectedValueOnce(new Error());

    expect(expenseService.findAll('xpt')).rejects.toThrowError();
  });

  describe('create', () => {
    it('Should be able to create a new expense', async () => {
      const data: CreateExpenseDto = {
        description: 'description',
        expenseDate: new Date(),
        userId: 'userId1',
        value: 10.5,
      };

      await expenseService.create(data);

      expect(expensesRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Should be able to update an expense', async () => {
      const data: UpdateExpenseDto = {
        description: 'descriptionUpdated',
        expenseDate: new Date(),
        value: 5.5,
      };

      await expenseService.update('userId', data);

      expect(expensesRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('Should be able to remove an expense', async () => {
      await expenseService.remove('expenseId1');

      expect(expensesRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
