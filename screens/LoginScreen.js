import {View} from 'react-native';
import {Button} from 'react-native-elements';
import useFormLogin from '../hooks/api/useFormLogin';

const formData = { username: 'leevipp', password: 'Kallekalle123' }; //temporary until the login form is ready

const LoginScreen = () => {
  const loginWithForm = useFormLogin();
  console.log("Logging in with ", formData)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Log in" onPress={() => loginWithForm(formData)}></Button>
    </View>
  );
};

export default LoginScreen;
