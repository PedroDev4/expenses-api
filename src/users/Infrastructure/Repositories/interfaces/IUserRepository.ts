import { User } from '../../../entities/User';

interface IUserRepository {
  create(user: User): Promise<void>;
  findOne(userId: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepository };