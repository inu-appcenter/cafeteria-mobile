import UseCase from './UseCase';
import CafeteriaRepository from '../../data/repositories/CafeteriaRepository';

class SetOrders extends UseCase<number[], void> {
  constructor(private readonly cafeteriaRepository: CafeteriaRepository) {
    super();
  }

  async onExecute(params: number[]): Promise<void> {
    return await this.cafeteriaRepository.saveOrders(params);
  }
}

export default new SetOrders(CafeteriaRepository.instance);
