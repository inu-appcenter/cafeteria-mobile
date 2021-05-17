import useStores from './useStores';

export default function useUserState() {
  const {userStore} = useStores();

  return {
    userId: userStore.userId,
    barcode: userStore.barcode,
    isLoggedIn: userStore.isLoggedIn,
    isTryingRememberedLogin: userStore.isTryingRememberedLogin,
  };
}
