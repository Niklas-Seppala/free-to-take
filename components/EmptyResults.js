import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import empty from '../assets/empty.png';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

/**
 *
 * @param {{style: object|undefined}} props
 * @returns
 */
export function EmptyResults({style}) {
  return (
    <View style={[style, {alignItems: 'center', justifyContent: 'center'}]}>
      <Image
        source={empty}
        style={{height: 80, width: 80, marginVertical: 10}}
      ></Image>
      <Text h4 style={{color: colors.main}}>
        Nothing here
      </Text>
    </View>
  );
}

EmptyResults.propTypes = {
  style: PropTypes.object,
};
