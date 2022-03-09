import React from 'react';
import { Button } from 'react-native-elements';
import { View } from 'react-native';
import * as ImagePickerUtil from 'expo-image-picker';
import { styles } from './UploadForm';

export function ImagePicker({ selected, onSuccess }) {
  const pickImage = async () => {
    const res = await ImagePickerUtil.launchImageLibraryAsync({
      mediaTypes: ImagePickerUtil.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!res.cancelled)
      onSuccess?.call(this, res);
  };

  return (
    <View>
      {selected && (
        <Image
          resizeMode={'contain'}
          source={{ uri: selected.uri }}
          containerStyle={styles.item} />
      )}
      <Button
        onPress={pickImage}
        title="Select file"
        icon={{
          type: 'font-awesome',
          name: 'file',
          size: 16,
        }} />
    </View>
  );
}
