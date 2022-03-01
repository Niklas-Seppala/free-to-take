import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import PropTypes from 'prop-types';

/**
 * Control buttons for moving carousel.
 * @param {{count: number, onLeft: () => void, onRight: () => void}} props
 */
export function CarouselControls({ count, onLeft, onRight }) {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.buttonContainer}>
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
      <Button
        icon={{ name: 'add-shopping-cart', color: '#daf2d3', size: 30 }}
        buttonStyle={{
          backgroundColor: '#6ab07c',
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
        title={<Text style={{ color: '#daf2d3', fontSize: 20 }}>Reserve</Text>}
      ></Button>
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
  buttonContainer: {
    marginVertical: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 0,
    backgroundColor: '#6ab07c',
  },
});
