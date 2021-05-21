import NoticeView from './NoticeView';
import GetAllNotices from '../../../../domain/usecases/GetAllNotices';
import {makeAutoObservable, runInAction} from 'mobx';
import handleApiError from '../../../../common/utils/handleApiError';
import sleep from '../../../../common/utils/sleep';

export default class NoticeStore {
  notices: NoticeView[] = [];
  currentNotice: NoticeView | undefined = undefined;

  constructor() {
    makeAutoObservable(this);

    this.fetch().catch(e => handleApiError(e));
  }

  async fetch() {
    const notices = await GetAllNotices.run();

    runInAction(() => {
      this.notices = notices.map(n => NoticeView.fromNotice(n));
    });

    sleep(500).then(() =>
      runInAction(() => {
        this.currentNotice = this.notices[0];
      }),
    );
  }

  dismissCurrentNotice() {
    this.currentNotice = undefined;
  }
}
