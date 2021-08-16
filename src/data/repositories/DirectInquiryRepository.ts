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

import axios from 'axios';
import Config from '../../common/Config';
import Question from '../../domain/entities/Question';
import {plainToClass} from 'class-transformer';

export default class DirectInquiryRepository {
  static instance = new DirectInquiryRepository();

  private url = {
    ask: `${Config.baseUrl}/ask`,
    questions: `${Config.baseUrl}/questions?withAnswers=true`,
    markAnswerRead: (answerId: number) => `${Config.baseUrl}/markAnswerRead/${answerId}`,
  };

  async ask(deviceInfo: string, version: string, content: string) {
    await axios.post(this.url.ask, {deviceInfo, version, content});
  }

  private async fetchQuestions() {
    return (await axios.get(this.url.questions)).data;
  }

  async getHistories() {
    return plainToClass(Question, await this.fetchQuestions());
  }

  async markAnswerRead(answerId: number) {
    await axios.post(this.url.markAnswerRead(answerId));
  }
}
