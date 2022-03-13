import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {EditPostForm} from '../components/EditPostForm';

export const EditPost = ({
  navigation,
  route: {
    params: {item},
  },
}) => {
  return (
    <View>
      <Card>
        <EditPostForm
          item={item}
          onSuccess={() => navigation.navigate('Home')}
        />
      </Card>
    </View>
  );
};

EditPost.propTypes = {
  navigation: PropTypes.object,
};
