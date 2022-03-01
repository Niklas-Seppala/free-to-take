import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-elements';
import colors from '../utils/colors';

export function CategoryTag({onPress, tag}) {
  const [active, setActive] = useState(true);
  return (
    <Chip
        icon={{ name: tag.icon, size: 20, color: colors.main }}
        type={active ? 'outline' : 'solid'}
        onPress={() => {
          setActive(!active);
          onPress?.call(this);
        }}
        title={tag.name}
      />
  );
}

export function TagFilter() {
  return (
    <View style={styles.container}>
      <CategoryTag tag={{name: 'asd', icon: 'home'}} onPress={() => {}} />
      <Card.Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
  },
});
