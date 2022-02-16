import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';

export default function Time({ ISOString, row = true, icon = true }) {
  const datetime = new Date(ISOString);
  return (
    <View style={styles.container}>
      {icon && (
        <Icon style={styles.icon} name="access-time" size={20} color="#888"></Icon>
      )}
      <View style={row === true ? { flexDirection: 'row' } : null}>
        <Text style={styles.dateTime}>{datetime.toLocaleTimeString()} </Text>
        <Text style={styles.dateTime}>{datetime.toLocaleDateString()} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 3,
  },
  dateTime: {
    color: '#888',
    fontStyle: 'italic',
  },
});
