import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import useFormLogin from '../hooks/api/useFormLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Text, Button } from 'react-native-elements';

const LoginForm = ({ navigation }) => {
  const loginWithForm = useFormLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      loginWithForm(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={styles.inputField}
          />
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.errorsField}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={styles.inputField}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorsField}>This is required.</Text>
      )}
      <View>
        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={styles.buttonField}
          containerStyle={{
            alignItems: 'center',
          }}
        />
      </View>
      <View style={styles.registerTextCont}>
        <Text style={styles.registerText}>Not a User? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          <Text style={styles.registerButton}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputField: {
    width: 250,
    height: 40,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderRadius: 24,
    paddingHorizontal: 15,
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.42)',
  },
  errorsField: { 
    color: 'red', 
    marginHorizontal: 18 },
  buttonField: {
    backgroundColor: '#5F9A3B',
            borderRadius: 5,
            borderWidth: 2,
            width: 100,
            borderColor: 'white',
            borderRadius: 30,
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
    fontSize: 15,
  },
  registerButton: {
    color: '#700d49',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default LoginForm;
