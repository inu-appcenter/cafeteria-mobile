import {useContext} from 'react';
import {StoreContext} from './StoreProvider';

export default function useStores() {
  return useContext(StoreContext);
}
