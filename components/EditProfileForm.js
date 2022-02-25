import { useContext, useEffect, React } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import useUserProfile from '../hooks/api/useUserProfile';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { GlobalContext } from '../context/GlobalContext';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Toast from 'react-native-toast-message';

const EditProfileForm = ({ navigation, onEditSuccess }) => {
  const { setUser, user } = useContext(GlobalContext);
  const setUserData = useUserProfile();

  //https://stackoverflow.com/a/201378
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      address: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    await setUserData(data);

    // bad hack to change user data locally
    user.username = data.username;
    user.email = data.email;
    setUser(user);

    console.log('SUBMITTING with data', data);
    Toast.show({
      type: 'success',
      text1: 'The changes to your profile have been saved',
    });
    onEditSuccess();
  };

  const showErrorMsg = () => {
    Toast.show({
      type: 'error',
      text1: 'Please fill all the form fields',
    });
  };

  useEffect(() => {
    setValue('email', user.email);
    setValue('username', user.username);
  }, []);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <TouchableOpacity
        style={{ flex: 1, width: '100%', height: '90%', justifyContent: 'flex-end' }}
        activeOpacity={1}
      >
        <KeyboardAwareScrollView
          style={{ width: '75%' }}
          keyboardShouldPersistTaps={'always'}
          style={{ flex: 1, width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: 'The username must be at least 3 characters long.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{ width: '100%' }}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: { value: emailRegex, message: 'Not a valid email address' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="email"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email && errors.email.message}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="address"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="address"
          />
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters long',
              },
              pattern: {
                value: /(?=.*[A-Z])(?=.*[0-9]).*/,
                message:
                  'Password must contain at least one number and one CAPITAL letter',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="password"
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password && errors.password.message}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                console.log(value, getValues('password'));
                return value == getValues('password') ? true : 'Passwords do not match';
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="confirm password"
                errorMessage={errors.password2 && errors.password2.message}
              />
            )}
            name="password2"
          />
          <View style={styles.buttonContainer}>
            <Button
              containerStyle={{ width: '50%' }}
              buttonStyle={styles.button}
              title="Save changes"
              onPress={() => (!errors ? handleSubmit(onSubmit) : showErrorMsg())}
            ></Button>
            <Button
              containerStyle={{ width: '50%' }}
              buttonStyle={styles.button}
              title="Cancel"
              onPress={() => {
                onEditSuccess();
              }}
            ></Button>
          </View>
        </KeyboardAwareScrollView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5F9A3B',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default EditProfileForm;
