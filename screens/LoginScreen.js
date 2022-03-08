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
      <LoginForm navigation={navigation}/>
      <LottieView
          source={require('../assets/animation.json')}
          style={{marginTop:190, alignItems:'center'}}
          autoPlay
          loop
        />
    </View>
  );
};

export default LoginScreen;