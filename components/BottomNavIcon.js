import React from 'react';
import { Icon } from 'react-native-elements';

const ICON_MAP = {
  Upload: 'add-circle-outline',
  Home: 'home',
  Profile: 'person',
};

/**
 * Icon for bottom tab navigator. 
 * 
 * @param {{focused: boolean, name: 'Upload' | 'Home' | 'Profile'}} param0
 * @returns
 */
export default function BottomNavIcon({ focused, name }) {
  return <Icon name={ICON_MAP[name]} size={35} color={focused ? '#eff7e6' : '#d2f0c9'} />;
}
