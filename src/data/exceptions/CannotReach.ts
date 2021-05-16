class CannotReach extends ApiError {
  constructor(errorCode: string) {
    super(`서버와 연결할 수 없습니다: ${errorCode}`);
  }
}
