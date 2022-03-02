import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadScreen from '../screens/UploadScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SingleScreen from '../screens/SingleScreen';
import useTokenLogin from '../hooks/api/useTokenLogin';
import BottomNavIcon from '../components/BottomNavIcon';
import { ScreenLoader } from '../components/ScreenLoader';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const RootNavigator = () => {
  const options = {headerShown: false};
  const [onGoing, success] = useTokenLogin();
  if (onGoing) return <ScreenLoader />;

  return (
    <Stack.Navigator>
      {success ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={options}
          />
          <Stack.Screen name="Single" component={SingleScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

function BottomTabNavigator() {
  const options = {
    headerShown: true,
    headerStyle: {backgroundColor: '#6ab07c'},
    tabBarStyle: {backgroundColor: '#6ab07c'},
    tabBarShowLabel: false,
  };

  /**
   * @param {'Upload'|'Home'|'Profile'} name
   */
  const individualOptions = (name) => ({
    title: name,
    headerTitleStyle: {color: 'white'},
    tabBarIcon: ({focused}) => <BottomNavIcon focused={focused} name={name} />,
  });

  return (
    <BottomTab.Navigator screenOptions={options} initialRouteName="Home">
      <BottomTab.Screen
        name="Upload"
        component={UploadScreen}
        options={individualOptions('Upload')}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={individualOptions('Home')}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={individualOptions('Profile')}
      />
    </BottomTab.Navigator>
  );
}
