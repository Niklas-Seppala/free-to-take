import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import { routes } from '../utils/api';
import PropTypes from 'prop-types';

/**
 * 
 * @route contained navigation and single file data 
 */
const SingleScreen = ({ route }) => {

  const { file } = route.params; // get a single file info
  const datetime = new Date(file.time_added); // convert the date string to Date format

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Image
          source={{ uri: routes.uploads.file(file.thumbnails.w640) }}
          style={styles.imgCover}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.titleTextField}>{file.title}</Text>
        </View>
        <View>
          <Text style={styles.descriptionTextField}>{file.description}</Text>
        </View>

        <View>
          <View style={styles.contentContainer2}>
            <View style={styles.contentContainer2}>
            <Icon
              styele={{ alignItems: 'flex-start'}}
              name="user-circle-o"
              type="font-awesome"
              color="white"
            />
            <Text style={styles.usernameTextField}>{file.owner.username}</Text>
            </View>

            <View>
              <Text style={styles.timestr}>{datetime.toLocaleTimeString()}</Text>
              <Text style={styles.timestr}>{datetime.toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    margin: 20,
    flex: 3,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderRadius: 40,
  },
  contentContainer: {
    flex: 3,
    marginHorizontal: 20,
    marginBottom:20,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderRadius: 29,
    justifyContent: 'flex-start',
  },
  contentContainer2: {
    flexDirection: 'row',

    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flex: 5,
    backgroundColor: 'rgba(39, 102, 0, 0.7)',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginHorizontal: -20,
    marginBottom: 0,
  },
  inputField: {
    height: 40,
    width:'100%',
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderRadius: 24,
    paddingHorizontal: 0,
    fontSize: 20,
    paddingHorizontal: 10,
    marginTop: 8,
    color: 'rgba(0, 0, 0, 0.42)',
  },
  titleTextField: {
    marginTop: 20,
    justifyContent: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  descriptionTextField: {
    top: 10,
    fontSize: 15,
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
    color: ' rgba(0, 0, 0, 0.34)',
  },
  usernameTextField: {
    top: 1,
    fontSize: 15,
    marginHorizontal: 5,
    fontWeight: '500',
    textAlign: 'center',
    color: ' rgba(0, 0, 0, 0.34)',
  },

  imgCover: {
    width: Dimensions.get('window').width - 40,
    height: '100%',
    borderRadius: 40,
  },
});

SingleScreen.propTypes = {
  route: PropTypes.object,
};
export default SingleScreen;