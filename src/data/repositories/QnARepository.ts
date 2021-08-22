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

export default class QnARepository {
  static instance = new QnARepository();

  private url = {
    ask: `${Config.baseUrl}/ask`,
    questions: `${Config.baseUrl}/questions?withAnswers=true`,
    markAnswerRead: (answerId: number) => `${Config.baseUrl}/markAnswerRead/${answerId}`,
  };

  async ask(params: Record<string, any>) {
    await axios.post(this.url.ask, params);
  }

  private async fetchQuestions() {
    return (await axios.get(this.url.questions)).data;
  }

  async getHistories() {
    // 최신순부터
    return plainToClass(Question, (await this.fetchQuestions()) as any[]).sort(
      (a, b) => b.askedAt.getTime() - a.askedAt.getTime(),
    );
  }

  async markAnswerRead(answerId: number) {
    await axios.post(this.url.markAnswerRead(answerId));
  }
}
