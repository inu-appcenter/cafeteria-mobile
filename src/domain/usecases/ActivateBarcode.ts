import UseCase from './UseCase';
import UserRepository from '../../data/repositories/UserRepository';

class ActivateBarcode extends UseCase {
  async onExecute(params: void): Promise<void> {
    await UserRepository.instance.activateBarcode();
  }
}

export default new ActivateBarcode();
