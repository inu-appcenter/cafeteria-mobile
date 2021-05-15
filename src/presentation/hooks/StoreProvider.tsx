import RootStore from '../../store/RootStore';
import React, {createContext, ReactNode} from 'react';

export const StoreContext = createContext<RootStore>({} as RootStore);

type Props = {
  store: RootStore;
  children: ReactNode;
};

export default function StoreProvider(props: Props) {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
}
