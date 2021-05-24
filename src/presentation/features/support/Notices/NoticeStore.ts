import NoticeView from './NoticeView';
import GetNewNotice from '../../../../domain/usecases/GetNewNotice';
import DismissNotice from '../../../../domain/usecases/DismissNotice';
import GetAllNotices from '../../../../domain/usecases/GetAllNotices';
import {makeAutoObservable} from 'mobx';

export default class NoticeStore {
  private _notices: NoticeView[] = [];
  get notices() {
    return this._notices;
  }
  set notices(value) {
    this._notices = value;
  }

  private _currentNotice: NoticeView | undefined = undefined;
  get currentNotice() {
    return this._currentNotice;
  }
  set currentNotice(value) {
    this._currentNotice = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAllNotices() {
    const notices = await GetAllNotices.run();

    this.notices = notices.map(n => NoticeView.fromNotice(n));
  }

  async fetchNewNotice() {
    const newNotice = await GetNewNotice.run();
    if (newNotice === undefined) {
      return;
    }

    this.currentNotice = NoticeView.fromNotice(newNotice);
  }

  async dismissCurrentNotice() {
    await DismissNotice.run(this.currentNotice?.id);

    this.currentNotice = undefined;
  }
}
