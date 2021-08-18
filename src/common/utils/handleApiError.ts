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

import notify from '../../presentation/components/utils/notify';
import ApiError from '../../data/exceptions/ApiError';
import Unauthorized from '../../data/exceptions/Unauthorized';
import InternalError from '../../data/exceptions/InternalError';
import CannotReachServer from '../../data/exceptions/CannotReachServer';
import UnhandledHttpError from '../../data/exceptions/UnhandledHttpError';
import TooManyRequests from '../../data/exceptions/TooManyRequests';
import BadRequest from '../../data/exceptions/BadRequest';

export default function handleApiError(e: Error) {
  if (!(e instanceof ApiError)) {
    notify(`😱 예상치 못한 오류입니다! ${e}`);
    return;
  }

  if (e instanceof CannotReachServer) {
    notify('🥺 서버에 연결할 수 없습니다. 인터넷 상태를 확인해 주세요!');
  } else if (e instanceof BadRequest) {
    notify('😨 잘못된 요청입니다.');
  } else if (e instanceof Unauthorized) {
    notify('😨 인증되지 않은 요청입니다.');
  } else if (e instanceof TooManyRequests) {
    notify('😨 너무 잦은 요청입니다.');
  } else if (e instanceof InternalError) {
    notify('🤯 서버 내부에서 문제가 생겼습니다.');
  } else if (e instanceof UnhandledHttpError) {
    notify(`🧐 응답 코드 ${e.statusCode}입니다.`);
  } else {
    notify(`😔 미처 처리하지 못한 오류입니다! ${e}`);
  }
}
