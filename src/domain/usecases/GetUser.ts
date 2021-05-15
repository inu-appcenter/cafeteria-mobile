import UseCase from './UseCase';
import UserRepository from '../../data/repositories/UserRepository';
import User from '../entities/User';

class GetUser extends UseCase<void, User | undefined> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async onExecute(_: void): Promise<User | undefined> {
    return await this.userRepository.getSavedUserInfo();
  }
}

export default new GetUser(UserRepository.instance);
