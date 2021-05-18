import BugStore from '../../store/RootStore';
import React, {createContext, ReactNode} from 'react';

export const StoreContext = createContext<BugStore>({} as BugStore);

type Props = {
  store: BugStore;
  children: ReactNode;
};

export default function StoreProvider(props: Props) {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
}
