import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalContext';
import {client, routes, setJWT} from '../../utils/api';
import {getToken} from '../../utils/storage';

/**
 * Hook for logging in with JWT. Setting JWT triggeres effect that attempts to fetch user
 * with corresponding token. If succesful, user data is stored to @see GlobalContext state,
 * and isLoggedIn flag is set.
 *
 * (JWT should be read from permanent storage).
 *
 */
export default function useTokenLogin() {
  const {setUser, user} = useContext(GlobalContext);
  const [onGoing, setOnGoing] = useState(true);

  useEffect(async () => {
    const token = await getToken();
    if (token) {
      try {
        const resp = await client.get(routes.user.myInfo, {
          headers: setJWT(token),
        });
        const user = resp.data;
        user.token = token;
        setUser(user);
        setOnGoing(false);
      } catch (error) {
        setOnGoing(false);
        console.error(error.message, 'at useTokenLogin hook');
      }
    } else {
      setOnGoing(false);
    }
  }, []);

  return [onGoing, user];
}
