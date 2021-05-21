import NoticeView from './NoticeView';
import GetAllNotices from '../../../../domain/usecases/GetAllNotices';
import {makeAutoObservable, runInAction} from 'mobx';

export default class NoticeStore {
  notices: NoticeView[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetch() {
    const notices = await GetAllNotices.run();

    runInAction(() => {
      this.notices = notices.map(n => NoticeView.fromNotice(n));
    });
  }
}
