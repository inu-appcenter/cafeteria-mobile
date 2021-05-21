import Question from '../../../../domain/entities/Question';
import AnswerView from './AnswerView';
import {formatElapsedDate} from '../../../../common/utils/Date';

export default class QuestionWithAnswerView {
  id: number = 0;
  content: string = '';
  date: string = '';

  answer?: AnswerView = undefined;

  static fromQuestion(question: Question): QuestionWithAnswerView {
    return {
      id: question.id,
      content: question.content,
      date: formatElapsedDate(question.createdAt),
      answer: question.answer
        ? AnswerView.fromAnswer(question.answer)
        : undefined,
    };
  }
}
