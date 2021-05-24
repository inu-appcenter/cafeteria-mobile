import axios from 'axios';
import Notice from '../../domain/entities/Notice';
import Config from '../../common/Config';
import {plainToClass} from 'class-transformer';
import Cache, {cachedFetch} from '../../common/utils/Cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NoticeFetchParams = {
  os: string;
  appVersion: string;
};

export default class NoticeRepository {
  static instance = new NoticeRepository();

  private url = {
    notices: (os: string, version: string) =>
      `${Config.baseUrl}/notices?os=${os}&version=${version}`,
    latestNotice: (os: string, version: string) =>
      `${Config.baseUrl}/notices/latest?os=${os}&version=${version}`,
  };

  private cache = {
    notices: new Cache<any>(),
    latestNotice: new Cache<any>(),
  };

  async getLatestNotice(params: NoticeFetchParams) {
    try {
      const rawNotice = await this.fetchLatestNotice(params);

      return plainToClass(Notice, rawNotice);
    } catch (e) {
      // 없으면 404가 뜰 것인데, 표현 계층까지 가져가야 할 중대한 '오류'는 아니므로
      // undefined를 반환하는 정도로 처리합니다.
      return undefined;
    }
  }

  private async fetchLatestNotice({os, appVersion}: NoticeFetchParams) {
    return cachedFetch(
      this.cache.latestNotice,
      async () => (await axios.get(this.url.latestNotice(os, appVersion))).data,
    );
  }

  async getAllNotices(params: NoticeFetchParams) {
    const rawNotices: object[] = await this.fetchNotices(params);

    return rawNotices.map(rawNotice => plainToClass(Notice, rawNotice));
  }

  private async fetchNotices({os, appVersion}: NoticeFetchParams) {
    return cachedFetch(
      this.cache.notices,
      async () => (await axios.get(this.url.notices(os, appVersion))).data,
    );
  }

  async dismissNotice(noticeId: number) {
    await AsyncStorage.setItem('dismissed_notice_id', noticeId.toString());
  }

  async getDismissedNoticeId() {
    return Number.parseInt(
      (await AsyncStorage.getItem('dismissed_notice_id')) || '0',
    );
  }
}
