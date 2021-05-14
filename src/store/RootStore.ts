import CounterStore from '../presentation/features/counter/CounterStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';

export default class RootStore {
  counterStore = new CounterStore();
  cafeteriaStore = new CafeteriaStore();
}
