import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { GlobalContext } from '../context/GlobalContext';
import useTokenLogin from '../hooks/api/useTokenLogin';
import { getToken } from '../utils/storage';

const LoginScreen = () => {
  const { user, isAuthenticated, token } = useContext(GlobalContext);
  const setToken = useTokenLogin();

  useEffect(async () => setToken(await getToken()), []);

  return (
    <View>
      {isAuthenticated && (
        <View>
          <Text>{user?.username}</Text>
          <Text>{token}</Text>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
