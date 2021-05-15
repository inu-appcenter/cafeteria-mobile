import useStores from './useStores';

export default function useGlobalState() {
  const {globalStore} = useStores();

  return {
    isLoggedIn: globalStore.isLoggedIn,
  };
}
