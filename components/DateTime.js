import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

/**
 *
 * @param {{ISOString: string, row: boolean, light: boolean, icon: boolean}} props
 * @returns
 */
export default function Time({ISOString, light, row = true, icon = true}) {
  const datetime = new Date(ISOString);
  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          style={styles.icon}
          name="access-time"
          size={20}
          color={light ? colors.light : '#888'}
        ></Icon>
      )}
      <View style={row === true ? {flexDirection: 'row'} : null}>
        <Text style={[{color: light ? colors.light : '#888'}, styles.dateTime]}>{datetime.toLocaleTimeString()} </Text>
        <Text style={[{color: light ? colors.light : '#888'}, styles.dateTime]}>{datetime.toLocaleDateString()} </Text>
      </View>
    </View>
  );
}

Time.propTypes = {
  ISOString: PropTypes.string.isRequired,
  row: PropTypes.bool,
  icon: PropTypes.bool,
  light: PropTypes.bool
};

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
    fontStyle: 'italic',
  },
});
