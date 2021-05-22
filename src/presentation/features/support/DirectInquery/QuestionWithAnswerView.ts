import Question from '../../../../domain/entities/Question';
import AnswerView from './AnswerView';
import {formatElapsedDate} from '../../../../common/utils/Date';

export default class QuestionWithAnswerView {
  id: number = 0;
  content: string = '';
  date: string = '';

  answer?: AnswerView = undefined;
  answerStatus: string = '';

  static fromQuestion(question: Question): QuestionWithAnswerView {
    const answer = question.answer
      ? AnswerView.fromAnswer(question.answer)
      : undefined;

    return {
      id: question.id,
      content: question.content,
      date: formatElapsedDate(question.createdAt),
      answer: answer,
      answerStatus: answer ? '답변 완료' : '답변 대기중',
    };
  }
}
