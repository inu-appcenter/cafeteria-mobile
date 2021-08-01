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

/**
 * start 부터 stop 사이의 숫자를 howMany 개로 등분한 숫자 배열을 생성합니다.
 * 예를 들어 start 1, stop 5, howMany 5 이면 [1, 2, 3, 4, 5] 입니다.
 *
 * 반환된 배열의 처음과 끝 값은 start, stop 입니다.
 *
 * @param start
 * @param stop
 * @param howMany
 */
export default function range(start: number, stop: number, howMany: number) {
  const travel = stop - start;
  const step = travel / (howMany - 1);

  const array = Array(howMany)
    .fill(start)
    .map((x, y) => x + y * step);

  // 처음과 끝이 중요하기 때문에 보정을 넣어 줍니다!
  array[0] = start;
  array[array.length - 1] = stop;

  return array;
}
