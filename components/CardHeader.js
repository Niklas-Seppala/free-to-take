import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import DateTime from './DateTime';

export default function CardHeader({ item }) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {item.title}
      </Text>
      <DateTime ISOString={item.time_added} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#242624',
  },
});
