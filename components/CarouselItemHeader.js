import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import DateTime from './DateTime';
import { PostPropType } from '../utils/appPropTypes';

/**
 * Header component for content carousel.
 * @param {{item: {title: string, time_added: string}}} props
 */
export default function CarouselItemHeader({ item }) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {item.title}
      </Text>
      <DateTime ISOString={item.time_added} />
    </View>
  );
}

CarouselItemHeader.propTypes = { item: PostPropType };

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#242624',
  },
});
