import axios from 'axios';
import Config from '../../common/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserCredentials = {
  id: string;
  token: string;
  barcode: string;
};

export default class UserRepository {
  static instance = new UserRepository();

  private url = {
    login: `${Config.baseUrl}/login`,
  };

  async loginWithIdAndPassword(id: string, password: string) {
    return this.login({id, password});
  }

  async loginWithIdAndToken(id: string, token: string) {
    return this.login({id, token});
  }

  private async login(params: object) {
    const {data} = await axios.post(this.url.login, params);

    return {
      token: data.token,
      barcode: data.barcode,
    };
  }

  async hasSavedUserCredentials() {
    return (await this.getSavedUserCredentials()) !== undefined;
  }

  async getSavedUserCredentials() {
    const serializedUserInfo = await AsyncStorage.getItem(
      'user_credentials_serialized',
    );
    if (serializedUserInfo === null) {
      return undefined;
    }

    return JSON.parse(serializedUserInfo) as UserCredentials;
  }

  async saveUserCredentials(credentials: UserCredentials) {
    await AsyncStorage.setItem(
      'user_credentials_serialized',
      JSON.stringify(credentials),
    );
  }

  async removeUserCredentials() {
    await AsyncStorage.removeItem('user_credentials_serialized');
  }
}
