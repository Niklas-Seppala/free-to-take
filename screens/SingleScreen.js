import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {routes} from '../utils/api';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

/**
 * The screen for showing a singular item
 * @route contained navigation and single file data
 */
const SingleScreen = ({route, navigation}) => {
  const file = route.params.item; // get a single file info
  const datetime = new Date(file.time_added); // convert the date string to Date format

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: routes.uploads.file(file.thumbnails.w640)}}
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
          <View style={styles.barContainer}>
            <View style={styles.userContainer}>
              <Icon
                styele={{alignItems: 'flex-start'}}
                name="user-circle-o"
                type="font-awesome"
                color="white"
              />
              <Text style={styles.usernameTextField}>
                {file.owner.username}
              </Text>
            </View>

            <View styele={{margin: 20}}>
              <Text style={styles.timestr}>
                {datetime.toLocaleTimeString()}
              </Text>
              <Text style={styles.timestr}>
                {datetime.toLocaleDateString()}
              </Text>
            </View>
            <Button
              buttonStyle={{backgroundColor: colors.main}}
              item={file}
              icon={{name: 'comment', size: 20, color: colors.light}}
              onPress={() => {
                navigation.navigate('Comments', {item: file});
              }}
            ></Button>
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
  imageContainer: {
    margin: 20,
    flex: 3,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderRadius: 40,
  },
  contentContainer: {
    flex: 3,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderRadius: 29,
    justifyContent: 'flex-start',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    paddingRight: 15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flex: 5,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginHorizontal: -20,
    marginBottom: 0,
  },
  titleTextField: {
    marginTop: 20,
    justifyContent: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginHorizontal: 15,
    borderRadius: 20,
  },
  descriptionTextField: {
    marginVertical: 10,
    fontSize: 15,
    marginHorizontal: 30,
    fontWeight: '500',
    color: '#000000',
  },
  usernameTextField: {
    top: 1,
    fontSize: 15,
    marginHorizontal: 5,
    fontWeight: '500',
    textAlign: 'center',
    color: '#00000f',
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
