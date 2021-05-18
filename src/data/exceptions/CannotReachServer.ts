import ApiError from './ApiError';

export default class CannotReachServer extends ApiError {
  constructor() {
    super(`서버에 연결할 수 없습니다.`);
  }
}
