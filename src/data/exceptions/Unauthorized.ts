import ApiError from './ApiError';

export default class Unauthorized extends ApiError {
  constructor() {
    super('인증에 실패하였습니다.');
  }
}
