export default class UnhandledHttpError extends Error {
  constructor() {
    super(
      '이크, 이걸 처리할 생각은 못 했네요..! 문의 남겨주시면 살펴보겠습니다!',
    );
  }
}
