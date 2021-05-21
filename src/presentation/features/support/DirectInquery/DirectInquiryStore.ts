import QuestionWithAnswerView from './QuestionWithAnswerView';
import {makeAutoObservable} from 'mobx';
import GetInquiryHistories from '../../../../domain/entities/GetInquiryHistories';

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

  async ask(content: string) {}
}
