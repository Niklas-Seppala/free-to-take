import React from 'react';
import {Alert, View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, Button} from 'react-native-elements';
import {client, routes} from '../utils/api';

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    let available = false;
    try {
      client
        .post(routes.user.create, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => console.error(e));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            minLength: {
              value: 3,
              message: 'Username has to be at least 3 characters.',
            },
            validate: async (value) => {
              try {
                const available = (
                  await client.get(routes.user.nameExists(value))
                ).data.available;

                if (available) {
                  return true;
                } else {
                  return 'Username is already taken.';
                }
              } catch (error) {
                throw new Error(error.message);
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Username"
              errorMessage={errors.username && errors.username.message}
              inputStyle={{
                width: 250,
                height: 40,
                backgroundColor: 'rgba(96, 162, 23, 0.3)',
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: 'rgba(0, 0, 0, 0.42)',
              }}
            />
          )}
          name="username"
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            minLength: {
              value: 5,
              message: 'Password has to be at least 5 characters.',
            },
            /*
          pattern: {
            value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u,
            message: 'Min 8, Uppercase, Number',
          },
          */
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Password"
              errorMessage={errors.password && errors.password.message}
              inputStyle={{
                width: 250,
                height: 40,
                backgroundColor: 'rgba(96, 162, 23, 0.3)',
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: 'rgba(0, 0, 0, 0.42)',
              }}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            validate: (value) => {
              const {password} = getValues();
              if (value === password) {
                return true;
              } else {
                return 'Passwords do not match.';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Confirm Password"
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
              inputStyle={{
                width: 250,
                height: 40,
                backgroundColor: 'rgba(96, 162, 23, 0.3)',
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: 'rgba(0, 0, 0, 0.42)',
              }}
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            pattern: {
              value: /\S+@\S+\.\S+$/,
              message: 'Has to be valid email.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Email"
              errorMessage={errors.email && errors.email.message}
              inputStyle={{
                width: 250,
                height: 40,
                backgroundColor: 'rgba(96, 162, 23, 0.3)',
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: 'rgba(0, 0, 0, 0.42)',
              }}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            minLength: {
              value: 3,
              message: 'Full name has to be at least 3 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              placeholder="Full name"
              errorMessage={errors.full_name && errors.full_name.message}
              inputStyle={{
                width: 250,
                height: 40,
                backgroundColor: 'rgba(96, 162, 23, 0.3)',
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: 'rgba(0, 0, 0, 0.42)',
              }}
            />
          )}
          name="full_name"
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  inputField: {
    width: 250,
    height: 30,
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
    fontSize: 15,
  },
  registerButton: {
    color: '#700d49',
    fontSize: 15,
    fontWeight: '500',
  },
});
export default RegisterForm;
