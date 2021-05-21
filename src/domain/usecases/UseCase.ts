export default abstract class UseCase<ParamT = void, ResultT = void> {
  async run(params: ParamT): Promise<ResultT> {
    console.log(
      `비동기 유스케이스 ${
        this.constructor.name
      }이(가) 다음 파라미터로 실행중입니다: ${JSON.stringify(params)}.`,
    );
    return await this.onExecute(params);
  }

  abstract async onExecute(params: ParamT): Promise<ResultT>;
}
