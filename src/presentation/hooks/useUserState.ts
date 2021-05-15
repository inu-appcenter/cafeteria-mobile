import useStores from './useStores';

export default function useUserState() {
  const {userStore} = useStores();

  return {
    isLoggedIn: userStore.isLoggedIn,
  };
}
