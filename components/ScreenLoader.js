import React from 'react';
import { View, ActivityIndicator } from 'react-native';


export function ScreenLoader() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={120} color="#6ab07c" />
    </View>
  );
}
