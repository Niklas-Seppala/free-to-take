import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { client, routes, setJWT } from '../../utils/api';

/**
 * Hook for logging in with JWT. Setting JWT triggeres effect that attempts to fetch user
 * with corresponding token. If succesful, user data is stored to @see GlobalContext state,
 * and isLoggedIn flag is set.
 *
 * (JWT should be read from permanent storage).
 *
 * @returns {React.Dispatch<string>} setToken - Set JWT token.
 */
export default function useTokenLogin() {
  const { setUser, setIsAuthenticated, token, setToken } = useContext(GlobalContext);

  useEffect(async () => {
    if (token) {
      try {
        const resp = await client.get(routes.user.myInfo, { headers: setJWT(token) });
        setUser(resp.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    }
  }, [token]);

  return setToken;
}
