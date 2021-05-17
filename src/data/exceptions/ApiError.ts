export default class ApiError extends Error {
  constructor(message?: string) {
    super(message || '개발자가 귀찮아서 내용을 빼먹어버린 ApiError 입니다!');
  }
}
