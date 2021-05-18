import UseCase from './UseCase';
import Cafeteria from '../entities/Cafeteria';
import CafeteriaRepository from '../../data/repositories/CafeteriaRepository';

export type Params = {
  dateOffset: number;
};

class GetCafeteria extends UseCase<Params, Cafeteria[]> {
  constructor(private readonly cafeteriaRepository: CafeteriaRepository) {
    super();
  }

  async onExecute({dateOffset}: Params): Promise<Cafeteria[]> {
    return await this.cafeteriaRepository.getCafeteria(dateOffset);
  }
}

export default new GetCafeteria(CafeteriaRepository.instance);
