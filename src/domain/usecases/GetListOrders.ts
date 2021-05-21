import UseCase from './UseCase';
import CafeteriaRepository from '../../data/repositories/CafeteriaRepository';

class GetListOrders extends UseCase<void, number[]> {
  constructor(private readonly cafeteriaRepository: CafeteriaRepository) {
    super();
  }

  async onExecute(params: void): Promise<number[]> {
    return this.cafeteriaRepository.getOrders();
  }
}

export default new GetListOrders(CafeteriaRepository.instance);
