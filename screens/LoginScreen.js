import { View } from 'react-native';
import { Button } from 'react-native-elements';
import useFormLogin from '../hooks/api/useFormLogin';

const formData = { username: 'nikke-nakke', password: 'salainen-sana' };

const LoginScreen = () => {
  const loginWithForm = useFormLogin();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Log in" onPress={() => loginWithForm(formData)}></Button>
    </View>
  );
};

export default LoginScreen;
