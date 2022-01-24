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

import axios from 'axios';
import ApiError, {ApiErrorConstructorType} from '../../data/exceptions/ApiError';
import Unauthorized from '../../data/exceptions/Unauthorized';
import InternalError from '../../data/exceptions/InternalError';
import CannotReachServer from '../../data/exceptions/CannotReachServer';
import UnhandledHttpError from '../../data/exceptions/UnhandledHttpError';
import TooManyRequests from '../../data/exceptions/TooManyRequests';
import BadRequest from '../../data/exceptions/BadRequest';
import Conflict from '../../data/exceptions/Conflict';
import Forbidden from '../../data/exceptions/Forbidden';

export default function setupAxios() {
  axios.interceptors.response.use(undefined, (error: any) => {
    if (error.response) {
      throw createResponseError(
        error.response.status,
        error.response.data?.error,
        error.response.data?.message,
      );
    } else {
      throw createConnectionError();
    }
  });
}

function createConnectionError(): ApiError {
  return new CannotReachServer();
}

function createResponseError(statusCode: number, error?: string, message?: string): ApiError {
  const mapping: Record<number, ApiErrorConstructorType> = {
    400: BadRequest,
    401: Unauthorized,
    403: Forbidden,
    409: Conflict,
    429: TooManyRequests,
    500: InternalError,
  };

  const errorClass = mapping[statusCode] || UnhandledHttpError;

  return new errorClass(statusCode, error, message);
}
