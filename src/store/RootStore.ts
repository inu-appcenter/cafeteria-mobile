import GithubProfileStore from '../presentation/features/github/GithubProfileStore';
import CounterStore from '../presentation/features/counter/CounterStore';

export default class RootStore {
  githubProfileStore = new GithubProfileStore();
  counterStore = new CounterStore();
}
