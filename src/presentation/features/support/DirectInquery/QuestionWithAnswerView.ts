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

import Question from '../../../../domain/entities/Question';
import AnswerView from './AnswerView';
import {formatElapsedDate} from '../../../../common/utils/Date';

export default class QuestionWithAnswerView {
  id: number;
  content: string;
  date: string;

  answer?: AnswerView;
  answerStatus: string;

  static fromQuestion(question: Question): QuestionWithAnswerView {
    const answer = question.answer ? AnswerView.fromAnswer(question.answer) : undefined;

    return Object.assign(new QuestionWithAnswerView(), {
      id: question.id,
      content: question.content,
      date: formatElapsedDate(question.askedAt),
      answer: answer,
      answerStatus: answer ? '답변 완료' : '답변 대기중',
    });
  }
}
