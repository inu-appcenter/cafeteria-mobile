import MakeInquiry from '../../../../domain/usecases/MakeInquiry';
import MarkAnswerRead from '../../../../domain/usecases/MarkAnswerRead';
import GetInquiryHistories from '../../../../domain/usecases/GetInquiryHistories';
import {makeAutoObservable} from 'mobx';
import QuestionWithAnswerView from './QuestionWithAnswerView';

export default class DirectInquiryStore {
  private _histories: QuestionWithAnswerView[] = [];
  get histories() {
    return this._histories;
  }
  set histories(value) {
    this._histories = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async fetchHistories() {
    const histories = await GetInquiryHistories.run();

    this.histories = histories.map(question =>
      QuestionWithAnswerView.fromQuestion(question),
    );
  }

  async ask(content: string) {
    await MakeInquiry.run({content});
  }

  async markAnswerRead(answerId: number) {
    await MarkAnswerRead.run({answerId});
  }
}
