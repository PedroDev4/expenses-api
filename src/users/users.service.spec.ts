import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User';
import { UserRepository } from './Infrastructure/Repositories/users.repository';
import { UsersService } from './users.service';

const usersEntityList = [
  new User('emailTest1@mail.com', '@username_test1', 'strongestpassword1'),
  new User('emailTest2@mail.com', '@username_test2', 'strongestpassword2'),
  new User('emailTest3@mail.com', '@username_test3', 'strongestpassword3'),
];

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
            findByEmail: jest.fn().mockResolvedValue(usersEntityList[1]),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Create', () => {
    it('Should be able to create a new user', async () => {
      const data: CreateUserDto = {
        email: 'mail.test@mail.com',
        password: 'strongestworldpassword',
        username: 'user name 1',
      };

      await usersService.create(data);

      expect(usersRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create', () => {
    it('Should be able to create a new user', async () => {
      const data: CreateUserDto = {
        email: 'mail.test@mail.com',
        password: 'strongestworldpassword',
        username: 'user name 1',
      };

      await usersService.create(data);

      expect(usersRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find', () => {
    it('Shoud be able to return a specific user', async () => {
      const result = await usersService.findOne('userId');

      expect(result).toEqual(usersEntityList[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Shoud be able to return a specific user by email', async () => {
      const result = await usersService.findByEmail('userEmail');

      expect(result).toEqual(usersEntityList[1]);
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
    });
  });
});
