import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <TextInput
        style={styles.inputField}
        underlineColorAndroid="rgba(96, 162, 23, 0.3)"
        placeholder="User Name"
        selectionColor="#fff"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputField}
        underlineColorAndroid="rgba(96, 162, 23, 0.3)"
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTextField}>{'Login'}</Text>
      </TouchableOpacity>
      <View style={styles.registerTextCont}>
        <Text style={styles.registerText}>Not a User? </Text>
        <TouchableOpacity>
          <Text style={styles.registerButton}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    width: 250,
    height:30,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderRadius: 24,
    paddingHorizontal: 15,
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.42)',
    marginVertical: 9,
  },
  button: {
    width: 150,
    backgroundColor: '#5F9A3B',
    borderRadius: 24,
    marginVertical: 9,
    paddingVertical: 11,
  },
  buttonTextField: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  registerTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  registerText: { 
	color: '#bd157a', 
	fontSize: 15 
  },
  registerButton: { 
	color: '#700d49', 
	fontSize: 15, 
	fontWeight: '500' 
  },
});
export default LoginScreen;
