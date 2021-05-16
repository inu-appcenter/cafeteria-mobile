import ApiError from './ApiError';

export default class InternalError extends ApiError {
  constructor() {
    super('서버 내부에서 문제가 발생하였습니다.');
  }
}
