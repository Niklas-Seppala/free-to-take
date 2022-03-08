import React, {useContext, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Input, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {client, routes, setJWT} from '../utils/api';
import {getToken} from '../utils/storage';
import {GlobalContext} from '../context/GlobalContext';

export const EditPostForm = ({onSuccess, item}) => {
  const {apiActionComplete} = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: item.title,
      description: item.description,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = await getToken();
      await client.put(routes.media.update(item.file_id), data, {
        headers: setJWT(token),
      });
      apiActionComplete();
      onSuccess?.call();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Card.Divider>
        <Text h4>Edit post</Text>
      </Card.Divider>

      <Controller
        name="title"
        control={control}
        rules={{required: 'Please provide title for upload.'}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
            inputStyle={styles.inputField}
            inputContainerStyle={{borderBottomWidth: 0}}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
            inputStyle={styles.inputField}
            inputContainerStyle={{borderBottomWidth: 0}}
          />
        )}
      />

      <View style={styles.horizontal}>
        <Button
          onPress={() => {
            reset();
            setImg(null);
          }}
          title="Reset"
          buttonStyle={styles.button}
        ></Button>
        <Button
          loading={loading}
          title="Update"
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.button}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  pickButton: {
    width: '100%',
    backgroundColor: '#5F9A3B',
    borderRadius: 24,
    marginVertical: 9,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
