import UseCase from './UseCase';
import CafeteriaRepository from '../../data/repositories/CafeteriaRepository';

class SaveListOrders extends UseCase<number[], void> {
  constructor(private readonly cafeteriaRepository: CafeteriaRepository) {
    super();
  }

  async onExecute(params: number[]): Promise<void> {
    return await this.cafeteriaRepository.saveOrders(params);
  }
}

export default new SaveListOrders(CafeteriaRepository.instance);
