import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

// const [tag, setTag] = useState('');
{/* <TagSelector onChange={(_, t) => setTag(tag !== t ? t : '')}/>  */}

const RegisterScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>Upload</Text>
    </View>
  );
};

export default RegisterScreen;
