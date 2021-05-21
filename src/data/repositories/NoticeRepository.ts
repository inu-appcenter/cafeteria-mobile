import axios from 'axios';
import Notice from '../../domain/entities/Notice';
import Config from '../../common/Config';
import {plainToClass} from 'class-transformer';
import Cache, {cachedFetch} from '../../common/utils/Cache';

type NoticeFetchParams = {
  os: string;
  appVersion: string;
};

export default class NoticeRepository {
  static instance = new NoticeRepository();

  private url = {
    notices: (os: string, version: string) =>
      `${Config.baseUrl}/notices?os=${os}&version=${version}`,
  };

  private cache = {
    notices: new Cache<any>(),
  };

  private async fetchCafeteria({os, appVersion}: NoticeFetchParams) {
    return cachedFetch(
      this.cache.notices,
      async () => (await axios.get(this.url.notices(os, appVersion))).data,
    );
  }

  async getAllNotices(params: NoticeFetchParams) {
    const rawNotices: object[] = await this.fetchCafeteria(params);

    return rawNotices.map(rawNotice => plainToClass(Notice, rawNotice));
  }
}
