import axios from 'axios';
import Config from '../../common/Config';
import Question from '../../domain/entities/Question';
import QuestionWithAnswerView from '../../presentation/features/support/DirectInquery/QuestionWithAnswerView';
import {plainToClass} from 'class-transformer';
import Answer from '../../domain/entities/Answer';

export default class DirectInquiryRepository {
  static instance = new DirectInquiryRepository();

  private url = {
    ask: `${Config.baseUrl}/ask`,
    answers: `${Config.baseUrl}/answers`,
    questions: `${Config.baseUrl}/questions`,
  };

  async ask(content: string) {
    await axios.post(this.url.ask);
  }

  private async fetchQuestions() {
    return (await axios.get(this.url.questions)).data;
  }

  private async fetchAnswers() {
    return (await axios.get(this.url.answers)).data;
  }

  async getHistories() {
    return new FetchResultReducer(
      await this.fetchQuestions(),
      await this.fetchAnswers(),
    ).reduce();
  }
}

class FetchResultReducer {
  constructor(
    private readonly questions: object[],
    private readonly answers: object[],
  ) {}

  private transformOptions = {
    excludeExtraneousValues: true,
  };

  private fillAnswer(question: Question) {
    const rawAnswer = this.answers.find(
      // @ts-ignore
      rawAnswer => rawAnswer['question-id'] === question.id,
    );

    question.answer = plainToClass(Answer, rawAnswer, this.transformOptions);

    return question;
  }

  async reduce() {
    return this.questions
      .map(rawQuestion =>
        plainToClass(Question, rawQuestion, this.transformOptions),
      )
      .map(question => this.fillAnswer(question));
  }
}
