import UseCase from './UseCase';
import Cafeteria from '../entities/Cafeteria';
import CafeteriaRepository from '../../data/repositories/CafeteriaRepository';

class GetCafeteriaOnly extends UseCase<void, Cafeteria[]> {
  constructor(private readonly cafeteriaRepository: CafeteriaRepository) {
    super();
  }

  async onExecute(_: void): Promise<Cafeteria[]> {
    return this.cafeteriaRepository.getCafeteriaOnly();
  }
}

export default new GetCafeteriaOnly(CafeteriaRepository.instance);
