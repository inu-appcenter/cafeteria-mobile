export default abstract class SyncUseCase<ParamT = void, ResultT = void> {
  run(params: ParamT): ResultT {
    console.log(
      `동기 유스케이스 ${
        this.constructor.name
      }이(가) 다음 파라미터로 실행중입니다: ${JSON.stringify(params)}.`,
    );
    return this.onExecute(params);
  }

  abstract onExecute(params: ParamT): ResultT;
}
