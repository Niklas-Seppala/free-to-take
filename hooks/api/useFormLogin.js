import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { client, routes } from '../../utils/api';
import { storeToken } from '../../utils/storage';
import { Alert } from 'react-native';
/**
 * Hook for logging in with form. Setting login values (username, password)
 * triggeres effect that attempts to authenticate with those values.
 * If succesful, user and JWT and isLoggedIn flag are stored to @see GlobalContext state
 * and up to date.
 *
 * JWT is stored to device permanent storage for future login attempts.
 *
 * @returns {React.Dispatch<{username: string, password: string}>} setLoginData
 */
export default function useFormLogin() {
  // Form values for password and username.
  const [loginData, setLoginData] = useState(null);
  const { setUser } = useContext(GlobalContext);

  /**
   * Set response payload data to GlobalContext and device
   * permanent storage.
   *
   * @param {{token: string: user: object}} response Server response payload.
   */
  const login = async (response) => {
    const { user, token } = response;
    const storage = storeToken(token); // Start IO.
    user.token = token;
    setUser(user);
    await storage; // Sync IO.
  };
  useEffect(async () => {
    if (loginData) {
      try {
        const resp = await client.post(routes.auth.login, loginData);
        await login(resp.data);
      } catch (error) {
        Alert.alert(
          `Your username or password incorrect\n
          or \n
          Your saved login data has been deleted`,
        );
      }
    }
  }, [loginData]); // re-run when username and password change.

  return setLoginData;
}
