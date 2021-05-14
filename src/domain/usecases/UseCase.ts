export default abstract class UseCase<ParamT, ResultT> {
  async run(params: ParamT): Promise<ResultT> {
    console.log(`UseCase ${this.constructor.name} is running.`);
    return await this.onExecute(params);
  }

  abstract async onExecute(params: ParamT): Promise<ResultT>;
}
