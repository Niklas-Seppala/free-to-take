import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import {clearStorage} from '../../utils/storage';

/**
 * Hook for logging out. Clears @see GlobalContext of active user and JWT,
 * clears device permanent storage.
 * IsAuthenticated flag is set to false.
 *
 * @returns {() => void} logout
 */
export default function useLogout() {
  const {setUser, user} = useContext(GlobalContext);
  const [logoutRequested, setLogoutRequested] = useState(false);
  const logout = () => setLogoutRequested(true);

  useEffect(async () => {
    if (logoutRequested && user) {
      await clearStorage();
      setUser(null);
      setLogoutRequested(false);
    }
  }, [logoutRequested]);

  return logout;
}
