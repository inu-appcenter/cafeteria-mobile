export default class Unauthorized extends Error {
  constructor() {
    super('인증에 실패하였습니다.');
  }
}
