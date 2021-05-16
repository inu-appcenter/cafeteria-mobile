import axios from 'axios';
import Unauthorized from '../../data/exceptions/Unauthorized';
import UnhandledHttpError from '../../data/exceptions/UnhandledHttpError';

export default function setupAxios() {
  axios.interceptors.request.use(undefined, (error: any) => {
    throw createRequestError(error.code);
  });

  axios.interceptors.response.use(undefined, (error: any) => {
    throw createResponseError(error.response.status);
  });
}

function createRequestError(errorCode: string): ApiError {
  return new CannotReach(errorCode);
}

function createResponseError(statusCode: number): ApiError {
  switch (statusCode) {
    case 401:
      return new Unauthorized();
    case 500:
      return new InternalError();
    default:
      return new UnhandledHttpError(statusCode);
  }
}
