import axios from 'axios';
import Unauthorized from '../../data/exceptions/Unauthorized';
import UnhandledHttpError from '../../data/exceptions/UnhandledHttpError';

export default function setupAxios() {
  axios.interceptors.response.use(undefined, (error: any) => {
    const errorClass = findProperErrorTypeForStatusCode(error.response.status);
    throw new errorClass();
  });
}

type Class = {new (...args: any[]): any};

function findProperErrorTypeForStatusCode(statusCode: number): Class {
  switch (statusCode) {
    case 401:
      return Unauthorized;
    default:
      return UnhandledHttpError;
  }
}
