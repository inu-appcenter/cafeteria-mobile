import UseCase from './UseCase';
import Question from '../entities/Question';
import DirectInquiryRepository from '../../data/repositories/DirectInquiryRepository';

class GetInquiryHistories extends UseCase<void, Question[]> {
  constructor(
    private readonly directInquiryRepository: DirectInquiryRepository,
  ) {
    super();
  }

  async onExecute(params: void): Promise<Question[]> {
    return this.directInquiryRepository.getHistories();
  }
}

export default new GetInquiryHistories(DirectInquiryRepository.instance);
