import Notice from '../entities/Notice';
import UseCase from './UseCase';
import {Platform} from 'react-native';
import NoticeRepository from '../../data/repositories/NoticeRepository';

class GetAllNotices extends UseCase<void, Notice[]> {
  constructor(private readonly noticeRepository: NoticeRepository) {
    super();
  }

  async onExecute(params: void): Promise<Notice[]> {
    return this.noticeRepository.getAllNotices({
      os: Platform.OS,
      appVersion: '0.1.0', // TODO 진짜 버전을 알아내보자! 이건 버저닝 틀 잡히면 하자!
    });
  }
}

export default new GetAllNotices(NoticeRepository.instance);
