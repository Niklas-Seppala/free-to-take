import {View} from 'react-native';
import RegisterForm from '../components/RegisterForm';
import {Card} from 'react-native-elements';

const RegisterScreen = ({navigation}) => {
  return (
    <View>
      <Card>
        <Card.Title h4>Register</Card.Title>
        <Card.Divider />
        <RegisterForm navigation={navigation} />
      </Card>
    </View>
  );
};

export default RegisterScreen;
