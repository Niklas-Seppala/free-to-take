import { View } from 'react-native';
import { Button } from 'react-native-elements';
import useFormLogin from '../hooks/api/useFormLogin';
import LoginForm from '../components/LoginForm';
const formData = { username: 'gajalakc', password: 'gaja123' };

const LoginScreen = ({navigation}) => {
  const loginWithForm = useFormLogin();

  return (
    <View style={{flex: 1,}}>
      <LoginForm navigation={navigation}/>
    </View>
  );
};

export default LoginScreen;