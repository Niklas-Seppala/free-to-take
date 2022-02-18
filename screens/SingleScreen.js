import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

const SingleScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <StatusBar translucent barStyle="light-content" />
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginHorizontal: 100,
          }}>
          <Icon
            name="angle-left"
            type="font-awesome"
            color="#FFFFFF"
            size="20px"
          />
          <Icon
            name="angle-right"
            type="font-awesome"
            color="#FFFFFF"
            size="20px"
          />
        </View>

        <FlatList
          horizontal
          data={SECTIONS}
          renderItem={({ item }) => <ListItem item={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.titleTextField}>
            {'LoFrozen t-paita koko 98/104gin'}
          </Text>
        </View>
        <View>
          <Text style={styles.locationTextField}>{'Helsinki'}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextField}>{'Reserve'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTextField}>{'Interested'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.descriTextField}>
            Paidat ja bodyt, koko: 98/104 (2-4 vuotta), tyttöjen Frozen Elsa
            t-paita koko 98/104. Muuten hyvässä kunnossa, mutta voikukan jälkiä
            paidassa. Savuton kissatalous.
          </Text>
        </View>
      </View>
    </View>
  );
};
const SECTIONS = [
  {
    key: '1',
    text: 'Item text 1',
    uri: 'https://picsum.photos/id/1/200',
  },
  {
    key: '2',
    text: 'Item text 2',
    uri: 'https://picsum.photos/id/10/200',
  },

  {
    key: '3',
    text: 'Item text 3',
    uri: 'https://picsum.photos/id/1002/200',
  },
  {
    key: '4',
    text: 'Item text 4',
    uri: 'https://picsum.photos/id/1006/200',
  },
  {
    key: '5',
    text: 'Item text 5',
    uri: 'https://picsum.photos/id/1008/200',
  },
];
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
    flex: 4,
    marginHorizontal: 20,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderTopStartRadius: 29,
    borderTopEndRadius: 29,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flex: 5,
    backgroundColor: 'rgba(39, 102, 0, 0.7)',
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
    marginHorizontal: -20,
  },
  inputField: {
    width: 250,
    height: 30,
    backgroundColor: 'rgba(96, 162, 23, 0.3)',
    borderborderRadius: 24,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#991172',
    marginVertical: 9,
  },
  button: {
    width: 100,
    marginHorizontal: 30,
    marginTop: 30,
    backgroundColor: '#5F9A3B',
    borderborderRadius: 24,
    marginVertical: 9,
    paddingVertical: 11,
    borderRadius: 20,
  },
  buttonTextField: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  titleTextField: {
    marginTop: 20,
    justifyContent: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  locationTextField: {
    top: 10,
    fontSize: 15,
    marginTop: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: ' rgba(0, 0, 0, 0.34)',
  },
  descriTextField: {
    textAlign: 'justify',
    fontSize: 15,
    marginTop: 50,
    marginHorizontal: 40,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  item: {
    margin: 0,
  },
  itemPhoto: {
    width: Dimensions.get('window').width - 40,
    height: '100%',
    borderRadius: 40,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});

export default SingleScreen;
