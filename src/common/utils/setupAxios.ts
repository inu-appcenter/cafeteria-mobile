import axios from 'axios';
import ApiError from '../../data/exceptions/ApiError';
import Unauthorized from '../../data/exceptions/Unauthorized';
import InternalError from '../../data/exceptions/InternalError';
import CannotReachServer from '../../data/exceptions/CannotReachServer';
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
  return new CannotReachServer(errorCode);
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
