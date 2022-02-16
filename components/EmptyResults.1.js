import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import empty from '../assets/empty.png';

export function EmptyResults({ style }) {
  return (
    <View style={[style, { alignItems: 'center', justifyContent: 'center' }]}>
      <Image
        source={empty}
        style={{ height: 100, width: 100, marginVertical: 10 }}
      ></Image>
      <Text h2>Nothing here</Text>
      <Text h4>404</Text>
    </View>
  );
}
