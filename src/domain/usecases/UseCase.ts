export default abstract class UseCase<ParamT = void, ResultT = void> {
  async run(params: ParamT): Promise<ResultT> {
    console.log(
      `UseCase ${this.constructor.name} is running with params ${JSON.stringify(
        params,
      )}.`,
    );
    return await this.onExecute(params);
  }

  abstract async onExecute(params: ParamT): Promise<ResultT>;
}
