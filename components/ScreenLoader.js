import React from 'react';
import {View, ActivityIndicator} from 'react-native';

/**
 * Screen sized loading spinner.
 */
export function ScreenLoader() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={120} color="#5F9A3B" />
    </View>
  );
}
