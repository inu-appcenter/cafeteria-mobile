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
import Answer from '../../domain/entities/Answer';
import Config from '../../common/Config';
import Question from '../../domain/entities/Question';
import {plainToClass} from 'class-transformer';

export default class DirectInquiryRepository {
  static instance = new DirectInquiryRepository();

  private url = {
    ask: `${Config.baseUrl}/ask`,
    answers: `${Config.baseUrl}/answers`,
    questions: `${Config.baseUrl}/questions`,
    markAnswerRead: (answerId: number) =>
      `${Config.baseUrl}/markAnswerRead/${answerId}`,
  };

  async ask(deviceInfo: string, version: string, content: string) {
    await axios.post(this.url.ask, {deviceInfo, version, content});
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

  async markAnswerRead(answerId: number) {
    await axios.post(this.url.markAnswerRead(answerId));
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
