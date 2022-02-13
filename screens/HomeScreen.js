import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import useAllMedia from '../hooks/api/useAllMedia';

const LoginScreen = () => {
  const media = useAllMedia();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>Home</Text>
    </View>
  );
};

export default LoginScreen;
