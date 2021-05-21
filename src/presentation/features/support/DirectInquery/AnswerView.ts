import Answer from '../../../../domain/entities/Answer';
import {formatElapsedDate} from '../../../../common/utils/Date';

export default class AnswerView {
  id: number = 0;
  key: string = '';
  title: string = '';
  body: string = '';
  read: boolean = false;
  date: string = '';

  static fromAnswer(answer: Answer): AnswerView {
    return {
      id: answer.id,
      key: `answer-${answer.id}`,
      title: answer.title,
      body: answer.body,
      read: answer.read,
      date: formatElapsedDate(answer.createdAt),
    };
  }
}
