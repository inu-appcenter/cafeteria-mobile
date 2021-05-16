import ApiError from './ApiError';

export default class UnhandledHttpError extends ApiError {
  constructor(readonly statusCode: number) {
    super(
      `응답 코드 ${statusCode}! 이크, 이걸 처리할 생각은 못 했네요..! 문의 남겨주시면 살펴보겠습니다!`,
    );
  }
}
