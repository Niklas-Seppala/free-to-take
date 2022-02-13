import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { GlobalContext } from '../context/GlobalContext';
import useFormLogin from '../hooks/api/useLogin';
import useLogout from '../hooks/api/useLogout';
import useTokenLogin from '../hooks/api/useTokenLogin';
import { getToken } from '../utils/storage';

const LoginScreen = () => {
  const { user, isAuthenticated, token } = useContext(GlobalContext);
  const login = useFormLogin();
  const setToken = useTokenLogin();
  const logout = useLogout();

  useEffect(async () => setToken(await getToken()), []);

  return (
    <View>
      {isAuthenticated ? (
        <View>
          <Text>{user?.username}</Text>
          <Text>{token}</Text>
          <Button title='logout' onPress={() => logout()}></Button>
        </View>
      ): (
        <View>
          <Button title='login' onPress={() => login({username: 'nikke-nakke', password: 'salainen-sana'})}></Button>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
