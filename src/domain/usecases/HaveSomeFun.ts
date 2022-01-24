/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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

import toast from '../../presentation/components/utils/toast';
import UseCase from './UseCase';
import {randomPick} from '../../common/utils/Array';

class HaveSomeFun extends UseCase {
  count: number = 0;
  iterator = getLyricsOfRandomSong();

  async onExecute(params: void): Promise<void> {
    if (++this.count % 4 === 0) {
      this.showNext();
    }
  }

  private showNext() {
    const next = this.iterator.next();
    if (next.done) {
      this.iterator = getLyricsOfRandomSong();
      toast('노래 끝!', '계속 하면 다른거 나와요!', 2000, 'success');
      return;
    }

    if (!next.value) {
      return;
    }

    const [line, songName] = next.value;

    toast(line, songName, 2000, 'info');
  }
}

export default new HaveSomeFun();

function* getLyricsOfRandomSong() {
  const songs = [
    {
      name: '작은 동물원',
      lines: [
        '삐약삐약 병아리',
        '음메 음메 송아지',
        '따당따당 사냥꾼',
        '뒤뚱뒤뚱 물오리',
        '푸푸 개구리',
        '집게 집게 집게 가재',
        '푸르르르르르물풀',
        '소라',
      ],
    },
    {
      name: '노을',
      lines: [
        '바람이 머물다 간 들판에',
        '모락모락 피어나는 저녁 연기',
        '색동옷 갈아입은 가을 언덕에',
        '빨갛게 노을이 타고 있어요',

        '허수아비 팔 벌려 웃음짓고',
        '초가 지붕 둥근 박 꿈꿀 때',
        '고개숙인 논밭의 열매',
        '노랗게 익어만 가는',

        '가을 바람 머물다 간 들판에',
        '모락모락 피어나는 저녁 연기',
        '색동옷 갈아입은 가을 언덕에',
        '붉게 물들어 타는 저녁놀',
      ],
    },
    {
      name: '우유송',
      lines: [
        '우유 좋아 우유 좋아',
        '우유 주세요 더주세요',
        '우유 좋아 우유 좋아',
        '세상에서 제일 좋아',

        '우유 좋아 우유 좋아',
        '우유 주세요 더주세요',
        '우유 좋아 우유 좋아',
        '세상에서 제일 좋아',

        '세상에서 제일 좋아',
      ],
    },
    {
      name: '예쁜 아기곰',
      lines: [
        '동그란 눈에 까만 작은 코',
        '하얀 털옷을 입은 예쁜 아기 곰',
        '언제나 너를 바라보면서',
        '작은 소망 얘기하지',

        '너의 곁에 있으면 나는 행복해',
        '어떤 비밀이라도 말할 수 있어',
        '까만 작은 코에 입을 맞추면',
        '수줍어 얼굴을 붉히는 예쁜 아기 곰',
      ],
    },
    {
      name: '대홍단감자',
      lines: [
        '둥글둥글 왕감자 대홍단 감자~',
        '너무 커서 하나를 못다 묵겠죠호',
        '냐하~~~~~~~~ 감자! 감자!',
        '왕감자! 쭁말 쭁말 쬬하요~~',
        '못다묵겠쬬~~',
      ],
    },
    {
      name: '꼬까신',
      lines: [
        '개나리 노란 꽃그늘아래',
        '가지런히 놓여있는 꼬까신하나',
        '아기는 사알짝 신 벗어 놓 - 고',
        '맨발로 한들한들 나들이 갔나',
        '가지런히 기다리는 꼬까신 하나',

        '개나리 노란 꽃그늘아래',
        '가지런히 놓여있는 꼬까신하나',
        '아기는 사알짝 신 벗어 놓 - 고',
        '맨발로 한들한들 나들이 갔나',
        '가지런히 기다리는 꼬까신 하나',
      ],
    },
  ];

  const song = randomPick(songs);

  for (const line of song.lines) {
    yield [line, song.name];
  }
}
