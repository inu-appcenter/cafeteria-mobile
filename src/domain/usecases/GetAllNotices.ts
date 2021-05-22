import Notice from '../entities/Notice';
import UseCase from './UseCase';
import {Platform} from 'react-native';
import PackageInfo from '../../common/PackageInfo';
import NoticeRepository from '../../data/repositories/NoticeRepository';

class GetAllNotices extends UseCase<void, Notice[]> {
  constructor(private readonly noticeRepository: NoticeRepository) {
    super();
  }

  async onExecute(params: void): Promise<Notice[]> {
    return this.noticeRepository.getAllNotices({
      os: Platform.OS,
      appVersion: PackageInfo.version,
    });
  }
}

export default new GetAllNotices(NoticeRepository.instance);
