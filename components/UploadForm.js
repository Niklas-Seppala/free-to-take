import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Card, Input, Text } from 'react-native-elements';
import { extractFileExt, extractFilename, handleFetch } from '../utils/forms';
import { StyleSheet, View } from 'react-native';
import { TAG, client, routes } from '../utils/api';
import { getToken } from '../utils/storage';
import { GlobalContext } from '../context/GlobalContext';
import * as ImagePickerUtil from 'expo-image-picker';

export function ImagePicker({ selected, onSuccess }) {
  const pickImage = async () => {
    const res = await ImagePickerUtil.launchImageLibraryAsync({
      mediaTypes: ImagePickerUtil.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!res.cancelled) onSuccess?.call(this, res);
  };

  return (
    <View>
      {selected && (
        <Card.Image
          resizeMode={'contain'}
          source={{ uri: selected.uri }}
          containerStyle={{
            height: 300,
            width: '100%',
          }}
        />
      )}
      <Button
        onPress={pickImage}
        title="Select file"
        buttonStyle={styles.pickButton}
        icon={{
          type: 'font-awesome',
          name: 'file',
          size: 16,
        }}
      />
    </View>
  );
}

export const UploadForm = ({ onSuccess }) => {
  const [img, setImg] = useState(null);
  const [inputIsValid, setInputIsValid] = useState(false);
  const { apiActionComplete } = useContext(GlobalContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const filename = extractFilename(img.uri);
      const fExtension = extractFileExt(filename);
      const mimetype = `${img.type}/${fExtension === 'jpg' ? 'jpeg' : fExtension}`;

      const upload = {
        uri: img.uri,
        name: filename,
        type: mimetype,
      };

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('file', upload);
      const token = await getToken();
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      };

      const result = await handleFetch(routes.media.uploads, options);
      if (Object.hasOwnProperty.call(result, 'file_id')) {
        let req_data = {};
        req_data.file_id = result.file_id;
        req_data.tag = TAG;
        client
          .post(routes.tag.create, req_data, {
            headers: { 'x-access-token': token },
          })
          .then((response) => {
            if (Object.hasOwnProperty.call(response.data, 'tag_id')) {
              onSuccess?.call();
              apiActionComplete();
            }
            console.log(response.data);
          })
          .catch((e) => console.log(e));
      }
    } catch (error) {
      console.error(error);
      setUpload(false);
    }
  };

  return (
    <>
      <Card.Divider>
        <Text h4>Upload file</Text>
      </Card.Divider>

      <Controller
        name="title"
        control={control}
        rules={{ required: 'Please provide title for upload.' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCapitalize="none"
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
            inputStyle={styles.inputField}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCapitalize="none"
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
            inputStyle={styles.inputField}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        )}
      />
      <Card.Divider>
        <ImagePicker
          selected={img}
          onSuccess={(img) => {
            setImg(img);
            setInputIsValid(true);
          }}
        />
      </Card.Divider>
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
          disabled={!inputIsValid}
          title="Upload"
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
