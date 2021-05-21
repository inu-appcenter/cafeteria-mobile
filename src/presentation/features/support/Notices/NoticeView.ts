import Notice from '../../../../domain/entities/Notice';
import {formatElapsedDate} from '../../../../common/utils/Date';

export default class NoticeView {
  id: number = 0;
  title: string = '';
  body: string = '';
  date: string = '';

  static fromNotice(notice: Notice): NoticeView {
    return {
      id: notice.id,
      title: notice.title,
      body: notice.body,
      date: formatElapsedDate(notice.createdAt),
    };
  }
}
