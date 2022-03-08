import {useContext, useEffect, React} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {GlobalContext} from '../context/GlobalContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import colors from '../utils/colors';
import { client, routes, setJWT } from '../utils/api';

const EditProfileForm = ({navigation}) => {
  const {setUser, user} = useContext(GlobalContext);

  //https://stackoverflow.com/a/201378
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      password2: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    // trim out empty fields as we only want to submit the fields with content in them
    data = Object.fromEntries(
      Object.entries(data).filter(([k, v]) => {
        return v != '';
      })
    );

      try {
        await client.put(routes.user.modify, data, {headers: setJWT(user.token)});
        setUser({...user, email: data.email, username: data.username});
        Toast.show({
          type: 'success',
          text1: 'The changes to your profile have been saved',
        });
        navigation.popToTop();
      } catch (error) {
        console.error(error);
      }
  };

  const validatePassword = async (value) => {
    // we need to allow the user to not change the password by leaving the fields empty
    // but we also need to allow him to change the password, but not leave it empty/give invalid values
    // tl;dr only validate the password field if its not empty
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9]).*/;

    if (value.length == 0) {
      return true;
    }

    if (value.length < 5) {
      return 'Password must be at least 5 characters long';
    }

    if (!value.match(passwordRegex)) {
      return 'Password must contain at least one number and one CAPITAL letter';
    }
  };

  useEffect(() => {
    setValue('email', user.email);
    setValue('username', user.username);
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          height: '90%',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
      >
        <KeyboardAwareScrollView
          style={{width: '75%', flex: 1, width: '100%'}}
          keyboardShouldPersistTaps={'always'}
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
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                style={{width: '100%'}}
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
              pattern: {
                value: emailRegex,
                message: 'Not a valid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="email"
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
            rules={{
              validate: async (value) => validatePassword(value),
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={true}
                errorMessage={errors.password && errors.password.message}
              />
            )}
            name="password"
          />
          {getValues('password') && !errors.password ? (
            <Controller
              control={control}
              rules={{
                validate: (value) => {
                  // only validate if the password is being changed
                  if (
                    getValues('password') &&
                    getValues('password').length > 0
                  ) {
                    return value == getValues('password')
                      ? true
                      : 'Passwords do not match';
                  }

                  return true;
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  placeholder="confirm password"
                  errorMessage={errors.password2 && errors.password2.message}
                />
              )}
              name="password2"
            />
          ) : (
            <></>
          )}
          <View style={styles.buttonContainer}>
            <Button
              containerStyle={{width: '50%'}}
              buttonStyle={styles.button}
              title="Save changes"
              disabled={Object.keys(errors).length > 0}
              onPress={handleSubmit(onSubmit)}
            ></Button>
            <Button
              containerStyle={{width: '50%'}}
              buttonStyle={styles.button}
              title="Cancel"
              onPress={() => navigation.popToTop()}
            ></Button>
          </View>
        </KeyboardAwareScrollView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
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
