import UseCase from './UseCase';
import UserRepository from '../../data/repositories/UserRepository';

type Params = {
  id: string;
  password: string;
};

class Login extends UseCase<Params | undefined> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async onExecute(params: Params | undefined): Promise<void> {
    if (params === undefined) {
      return this.tryLoginWithSavedCredentials();
    } else {
      return this.tryLoginWithUserInput(params);
    }
  }

  private async tryLoginWithSavedCredentials() {
    const credentials = await this.userRepository.getSavedUserCredentials();
    if (credentials === undefined) {
      throw new Error('저장된 사용자 정보가 없어요!');
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
  }

  private async tryLoginWithUserInput(params: Params) {
    const {token, barcode} = await this.userRepository.loginWithIdAndPassword(
      params.id,
      params.password,
    );

    await this.userRepository.saveUserCredentials({
      id: params.id,
      token: token,
      barcode: barcode,
    });
  }
}

export default new Login(UserRepository.instance);
