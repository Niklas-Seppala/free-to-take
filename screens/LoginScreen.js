import React from 'react';
import { View } from 'react-native';
import LoginForm from '../components/LoginForm';
import LottieView from "lottie-react-native";
/**
 * 
 * @navigation for navigate the screen back and front
 * @returns 
 */
const LoginScreen = ({navigation}) => {
  return (
    <View style={{flex: 1,}}>
      <View style={{flex: 1,}}>
        <LoginForm navigation={navigation}/>
      </View>
      <View style={{flex: 1,}}>
        <LottieView
          source={require('../assets/animation.json')}
          autoPlay
          loops
        />
      </View>
    </View>
  );
};

export default LoginScreen;