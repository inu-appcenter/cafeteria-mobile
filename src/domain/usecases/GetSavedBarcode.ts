import UseCase from './UseCase';
import UserRepository from '../../data/repositories/UserRepository';

class GetSavedBarcode extends UseCase<undefined, string | undefined> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async onExecute(_: undefined): Promise<string | undefined> {
    return (await this.userRepository.getSavedUserCredentials())?.barcode;
  }
}

export default new GetSavedBarcode(UserRepository.instance);
