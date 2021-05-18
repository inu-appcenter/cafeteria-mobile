import axios from 'axios';
import ApiError from '../../data/exceptions/ApiError';
import Unauthorized from '../../data/exceptions/Unauthorized';
import InternalError from '../../data/exceptions/InternalError';
import CannotReachServer from '../../data/exceptions/CannotReachServer';
import UnhandledHttpError from '../../data/exceptions/UnhandledHttpError';

export default function setupAxios() {
  axios.interceptors.response.use(undefined, (error: any) => {
    if (error.response) {
      throw createResponseError(error.response.status);
    } else {
      throw createConnectionError();
    }
  });
}

function createConnectionError(): ApiError {
  return new CannotReachServer();
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
