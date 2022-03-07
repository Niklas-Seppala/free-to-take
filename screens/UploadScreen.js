import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from 'react-native-elements';
import { UploadForm } from '../components/UploadForm';

export const UploadScreen = ({ navigation }) => {
  return (
    <View>
      <Card>
        <UploadForm onSuccess={() => navigation.navigate('HomeScreen')} />
      </Card>
    </View>
  );
};

UploadScreen.propTypes = {
  navigation: PropTypes.object,
};
