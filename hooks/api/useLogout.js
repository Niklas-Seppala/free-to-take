import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { clearStorage } from '../../utils/storage';

/**
 * Hook for logging out. Clears @see GlobalContext of active user and JWT,
 * clears device permanent storage. 
 * IsAuthenticated flag is set to false.
 * 
 * @returns {() => void} logout
 */
export default function useLogout() {
  const { setToken, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(GlobalContext);

  // Internal hook state.
  const [logoutRequested, setLogoutRequested] = useState(false);

  const logout = () => setLogoutRequested(!logoutRequested);

  useEffect(async () => {
    // If user is authenticated, clear everything.
    if (isAuthenticated) {
      const storage = clearStorage(); // Start IO.
      setUser(null);
      setToken(null);
      setIsAuthenticated(false)
      await storage; // Sync IO.
    }
  }, [logoutRequested]);

  return logout;
}
