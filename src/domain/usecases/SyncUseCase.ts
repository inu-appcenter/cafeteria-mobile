export default abstract class SyncUseCase<ParamT = void, ResultT = void> {
  run(params: ParamT): ResultT {
    console.log(
      `UseCase ${this.constructor.name} is running with params ${JSON.stringify(
        params,
      )}.`,
    );
    return this.onExecute(params);
  }

  abstract onExecute(params: ParamT): ResultT;
}
