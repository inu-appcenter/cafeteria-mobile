import UseCase from './UseCase';
import DirectInquiryRepository from '../../data/repositories/DirectInquiryRepository';

type Params = {
  answerId: number;
};

class MarkAnswerRead extends UseCase<Params, void> {
  constructor(
    private readonly directInquiryRepository: DirectInquiryRepository,
  ) {
    super();
  }

  async onExecute(params: Params): Promise<void> {
    await this.directInquiryRepository.markAnswerRead(params.answerId);
  }
}

export default new MarkAnswerRead(DirectInquiryRepository.instance);
