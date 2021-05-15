import axios from 'axios';
import Config from '../../common/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../domain/entities/User';

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

  async hasSavedUserInfo() {
    return (await this.getSavedUserInfo()) !== undefined;
  }

  async getSavedUserInfo() {
    const serializedUserInfo = await AsyncStorage.getItem(
      'user_info_serialized',
    );
    if (serializedUserInfo === null) {
      return undefined;
    }

    return JSON.parse(serializedUserInfo) as User;
  }

  async saveUserInfo(user: User) {
    await AsyncStorage.setItem('user_info_serialized', JSON.stringify(user));
  }

  async removeUserInfo() {
    await AsyncStorage.removeItem('user_credentials_serialized');
  }
}
