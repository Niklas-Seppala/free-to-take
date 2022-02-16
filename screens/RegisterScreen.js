import {View} from 'react-native';
import RegisterForm from '../context/RegisterForm';
import {Card} from 'react-native-elements';

const RegisterScreen = () => {
  return (
    <View>
      <Card>
        <Card.Title h4>Register</Card.Title>
        <Card.Divider />
        <RegisterForm />
      </Card>
    </View>
  );
};

export default RegisterScreen;
