import axios from 'axios';

class GithubRepository {
  private url = 'https://api.github.com/users';

  getUserInfo(userId: string) {
    return axios.get(`${this.url}/${userId}`);
  }
}

export default new GithubRepository();
