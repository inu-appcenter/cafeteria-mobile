import UseCase from './UseCase';
import NoticeRepository from '../../data/repositories/NoticeRepository';

class DismissNotice extends UseCase<number | undefined, void> {
  constructor(private readonly noticeRepository: NoticeRepository) {
    super();
  }

  async onExecute(noticeId?: number): Promise<void> {
    if (noticeId === undefined) {
      return;
    }

    await this.noticeRepository.dismissNotice(noticeId);
  }
}

export default new DismissNotice(NoticeRepository.instance);
