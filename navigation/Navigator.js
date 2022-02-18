import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadScreen from '../screens/UploadScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SingleScreen from '../screens/SingleScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const RootNavigator = () => {
  // !! DEV VALUE, TOGGLE BETWEEN LOGIN/REGISTER AND HOME/PROFILE/UPLOAD
  const loggedIn = true;
  return (
    <Stack.Navigator>
      {loggedIn ? (
        <>
        <Stack.Screen name="Single" component={SingleScreen} />
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          
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
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: true, tabBarActiveTintColor: '#40a62e' }}
      initialRouteName="Home"
    >
      <BottomTab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => <TabBarIcon name="upload" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon({ name, color }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} name={name} color={color} />;
}
