import GithubUser from '../../../data/entities/GithubUser';
import {makeAutoObservable, runInAction} from 'mobx';
import githubRepository from '../../../data/repositories/GithubRepository';

export default class GithubProfileStore {
  public currentUser = new GithubUser();

  constructor() {
    makeAutoObservable(this);
  }

  fetchUserInfo(userId: string) {
    githubRepository.getUserInfo(userId).then(({data}) => {
      runInAction(() => {
        this.currentUser = {
          id: data.login,
          name: data.name,
          bio: data.bio,
        };
      });
    });
  }
}
