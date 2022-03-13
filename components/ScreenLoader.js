import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import colors from '../utils/colors';

/**
 * Screen sized loading spinner.
 */
export function ScreenLoader() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={120} color={colors.main} />
    </View>
  );
}
