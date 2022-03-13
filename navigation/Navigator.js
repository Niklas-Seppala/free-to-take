import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {UploadScreen} from '../screens/UploadScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SingleScreen from '../screens/SingleScreen';
import ChatScreen from '../screens/ChatScreen';
import useTokenLogin from '../hooks/api/useTokenLogin';
import BottomNavIcon from '../components/BottomNavIcon';
import {ScreenLoader} from '../components/ScreenLoader';
import EditProfile from '../screens/EditProfile';
import colors from '../utils/colors';
import {EditPost} from '../screens/EditPost';
import {ProfileVisitorScreen} from '../screens/ProfileVisitorScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const stackOptions = {
  headerShown: true,
  headerStyle: {backgroundColor: colors.main, shadowColor: 'transparent'},
  tabBarStyle: {backgroundColor: colors.main},
  tabBarShowLabel: false,
};

const RootNavigator = () => {
  const options = {
    headerShown: false,
    headerStyle: {backgroundColor: '#6ab07c', shadowColor: 'transparent'},
  };
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
          <Stack.Screen
            name="Single"
            component={SingleScreen}
            options={stackOptions}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={stackOptions}
          />
          <Stack.Screen
            name="EditPost"
            component={EditPost}
            options={stackOptions}
          />
          <Stack.Screen
            name="ProfileVisitor"
            component={ProfileVisitorScreen}
            options={stackOptions}
          />
          <Stack.Screen
            name="Comments"
            component={ChatScreen}
            options={stackOptions}
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
  /**
   * @param {'Upload'|'Home'|'Profile'} name
   */
  const individualOptions = (name) => ({
    title: name,
    headerTitleStyle: {color: colors.light},
    tabBarIcon: ({focused}) => <BottomNavIcon focused={focused} name={name} />,
  });

  return (
    <BottomTab.Navigator screenOptions={stackOptions} initialRouteName="Home">
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
