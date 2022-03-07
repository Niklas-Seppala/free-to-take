import { View } from 'react-native';
import { Text } from 'react-native-elements';

const SingleScreen = ({route}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>Single</Text>
    </View>
  );
};

export default SingleScreen;
