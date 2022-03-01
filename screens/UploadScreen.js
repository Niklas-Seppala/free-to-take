import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalContext } from '../context/GlobalContext';
import { client, routes, setJWT } from '../utils/api';
const UploadScreen = ({ navigation }) => {
  const [image, setImage] = useState('https://place-hold.it/300x200&text=Choose');
  const [type, setType] = useState('image');
  const [imageSelected, setImageSelected] = useState(false);
  const { user } = useContext(GlobalContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };
  const reset = () => {
    setImage('https://place-hold.it/300x200&text=Choose');
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
    setType('image');
  };
  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      const filename = image.split('/').pop();
      let fileExtension = filename.split('.').pop();
      fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
      formData.append('file', {
        uri: image,
        name: filename,
        type: type + '/' + fileExtension,
      });
      client
        .post(routes.media.uploads, formData, { headers: setJWT(user.token) })
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
      <Card>
        <Card.Image
          source={{ uri: image }}
          style={styles.image}
          onPress={pickImage}
        ></Card.Image>
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
              placeholder="Title"
              errorMessage={errors.title && 'This is required.'}
            />
          )}
          name="title"
        />
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
              placeholder="Description"
              errorMessage={errors.description && 'This is required.'}
            />
          )}
          name="description"
        />
        <Button title="Choose image" onPress={pickImage} />
        <Button
          disabled={!imageSelected}
          title="Upload"
          onPress={handleSubmit(onSubmit)}
        />
        <Button title="Reset form" onPress={reset} />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});
UploadScreen.propTypes = {
  navigation: PropTypes.object,
};
export default UploadScreen;
