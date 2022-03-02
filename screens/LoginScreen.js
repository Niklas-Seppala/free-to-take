import { View } from 'react-native';
import { Button } from 'react-native-elements';
import LoginForm from '../components/LoginForm';

/**
 * 
 * @navigation for navigate the screen back and front
 * @returns 
 */
const LoginScreen = ({navigation}) => {
  return (
    <View style={{flex: 1,}}>
      <LoginForm navigation={navigation}/>
    </View>
  );
};

export default LoginScreen;