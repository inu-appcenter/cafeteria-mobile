import Notice from '../entities/Notice';
import UseCase from './UseCase';
import {Platform} from 'react-native';
import PackageInfo from '../../common/PackageInfo';
import NoticeRepository from '../../data/repositories/NoticeRepository';

class GetNewNotice extends UseCase<void, Notice | undefined> {
  constructor(private readonly noticeRepository: NoticeRepository) {
    super();
  }

  async onExecute(params: void): Promise<Notice | undefined> {
    const latestNotice = await this.noticeRepository.getLatestNotice({
      os: Platform.OS,
      appVersion: PackageInfo.version,
    });

    if (latestNotice === undefined) {
      return undefined;
    }

    const dismissedNoticeId =
      await this.noticeRepository.getDismissedNoticeId();

    if (latestNotice.id <= dismissedNoticeId) {
      // 최신 공지가 사용자에게도 최신이 아니면(확인한 적이 있으면) undefined를 반환하는 것으로 끝냅니다.
      return undefined;
    }

    return latestNotice;
  }
}

export default new GetNewNotice(NoticeRepository.instance);
