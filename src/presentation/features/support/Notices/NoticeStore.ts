import sleep from '../../../../common/utils/sleep';
import NoticeView from './NoticeView';
import GetNewNotice from '../../../../domain/usecases/GetNewNotice';
import DismissNotice from '../../../../domain/usecases/DismissNotice';
import GetAllNotices from '../../../../domain/usecases/GetAllNotices';
import handleApiError from '../../../../common/utils/handleApiError';
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

    this.fetch().catch(e => handleApiError(e));
  }

  async fetch() {
    await this.fetchNotices();
    await sleep(500);
    await this.fetchOneNewNotice();
  }

  private async fetchNotices() {
    const notices = await GetAllNotices.run();
    this.notices = notices.map(n => NoticeView.fromNotice(n));
  }

  private async fetchOneNewNotice() {
    const newNotice = await GetNewNotice.run();
    this.currentNotice = newNotice
      ? NoticeView.fromNotice(newNotice)
      : undefined;
  }

  async dismissCurrentNotice() {
    await DismissNotice.run(this.currentNotice?.id);

    this.currentNotice = undefined;
  }
}
