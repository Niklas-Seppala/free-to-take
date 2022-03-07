import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

/**
 * Control buttons for moving carousel.
 * @param {{count: number, onLeft: () => void, onRight: () => void, onSelect: (number) => void}} props
 */
export function CarouselControls({ count, onSelect, onLeft, onRight }) {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Button
        disabledStyle={{ backgroundColor: '#6ab07caa' }}
        disabled={index === 0}
        buttonStyle={styles.button}
        icon={{ name: 'chevron-left', size: 40, color: '#daf2d3' }}
        onPress={() => {
          onLeft();
          setIndex(Math.max(0, index - 1));
        }}
      ></Button>
      <View style={{flexDirection: 'row'}}>
      <Button
        icon={{ name: 'delete-forever', color: '#daf2d3', size: 30 }}
        buttonStyle={{backgroundColor: colors.negative, marginRight: 15}}
      />
      <Button
        icon={{ name: 'add-shopping-cart', color: '#daf2d3', size: 30 }}
        buttonStyle={{backgroundColor: '#6ab07c'}}
        onPress={() => onSelect?.call(this, index)}
        />
      </View>
      <Button
        disabled={index === count - 1}
        disabledStyle={{ backgroundColor: '#6ab07caa' }}
        buttonStyle={styles.button}
        icon={{ name: 'chevron-right', size: 40, color: '#daf2d3' }}
        onPress={() => {
          onRight();
          setIndex(Math.min(index + 1, count));
        }}
      ></Button>
    </View>
  );
}

CarouselControls.propTypes = {
  count: PropTypes.number,
  onLeft: PropTypes.func.isRequired,
  onRight: PropTypes.func.isRequired,
};

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  button: {
    padding: 0,
    backgroundColor: '#6ab07c',
  },
});
