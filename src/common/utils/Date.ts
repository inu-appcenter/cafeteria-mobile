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

import moment from 'moment';
import {format, isToday, isTomorrow} from 'date-fns';
import {ko} from 'date-fns/locale';

moment.locale('ko'); // 한글사랑 합시다 후후

export function formatElapsedDate(date: Date) {
  const now = moment();
  const then = moment(date);
  const duration = moment.duration(moment().diff(then));

  if (duration.asSeconds() < 60) {
    return '방금';
  } else if (duration.asMinutes() < 60) {
    return `${duration.asMinutes().toFixed(0)}분 전`;
  } else if (duration.asHours() < 24) {
    return `${duration.asHours().toFixed(0)}시간 전`;
  } else if (duration.asDays() < 2) {
    return '어제';
  } else if (duration.asDays() < 7) {
    return `${then.format('dddd')}`;
  } else if (then.year() === now.year()) {
    return then.format('MM/DD');
  } else {
    return then.format('YY/MM/DD');
  }
}

export function formatDate(date: Date) {
  return format(date, 'yyyy년 M월 d일 cccc', {locale: ko});
}

export function formatDateDiffWithDate(date: Date) {
  const dateDiffString = isToday(date) ? '오늘' : isTomorrow(date) ? '내일' : format(date, 'M월 d일');
  const dayString = format(date, 'cccc', {locale: ko});

  return `${dateDiffString}(${dayString})`;
}

export function formatTime(date: Date) {
  return format(date, 'H시 m분');
}

export function formatTimeShort(date: Date) {
  return format(date, 'HH:mm');
}
