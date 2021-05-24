/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
