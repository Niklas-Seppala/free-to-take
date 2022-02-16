import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import useLogout from '../hooks/api/useLogout'

const ProfileScreen = () => {
  const logout = useLogout();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>Profile</Text>
      <Button title='Log out' onPress={() => logout()}></Button>
    </View>
  );
};

export default ProfileScreen;
