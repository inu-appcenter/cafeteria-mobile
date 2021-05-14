import UseCase from './UseCase';
import UserRepository from '../../data/repositories/UserRepository';

type Params = {
  id: string;
  password: string;
};

type Results = {
  succeeded: boolean;
};

class Login extends UseCase<Params | undefined, Results> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async onExecute(params: Params | undefined): Promise<Results> {
    if (params === undefined) {
      return this.tryLoginWithSavedCredentials();
    } else {
      return this.tryLoginWithUserInput(params);
    }
  }

  private async tryLoginWithSavedCredentials(): Promise<Results> {
    const credentials = await this.userRepository.getSavedUserCredentials();
    if (credentials === undefined) {
      return {
        succeeded: false,
      };
    }

    const {token, barcode} = await this.userRepository.loginWithIdAndToken(
      credentials.id,
      credentials.token,
    );

    await this.userRepository.saveUserCredentials({
      id: credentials.id,
      token: token,
      barcode: barcode,
    });

    return {
      succeeded: true,
    };
  }

  private async tryLoginWithUserInput(params: Params): Promise<Results> {
    const {token, barcode} = await this.userRepository.loginWithIdAndPassword(
      params.id,
      params.password,
    );

    await this.userRepository.saveUserCredentials({
      id: params.id,
      token: token,
      barcode: barcode,
    });

    return {
      succeeded: true,
    };
  }
}

export default new Login(UserRepository.instance);
