import UseCase from './UseCase';
import Notice from '../entities/Notice';
import GetAllNotices from './GetAllNotices';
import NoticeRepository from '../../data/repositories/NoticeRepository';

class GetNewNotice extends UseCase<void, Notice | undefined> {
  constructor(private readonly noticeRepository: NoticeRepository) {
    super();
  }

  async onExecute(params: void): Promise<Notice | undefined> {
    const allNotices = await GetAllNotices.run();

    const dismissedNoticeId =
      await this.noticeRepository.getDismissedNoticeId();

    const noticesAfterLatelyDismissedOne = allNotices.filter(
      n => n.id > dismissedNoticeId,
    );

    return noticesAfterLatelyDismissedOne[0];
  }
}

export default new GetNewNotice(NoticeRepository.instance);
