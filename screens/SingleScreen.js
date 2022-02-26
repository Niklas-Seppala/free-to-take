import React, { useContext, useEffect, useState , setState} from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Input, Button } from 'react-native-elements';
import { MessageList } from 'react-chat-elements';
import { client, routes, setJWT } from '../utils/api';
import { GlobalContext } from '../context/GlobalContext';

// User input
const comment = {
  file_id: 541,
};
var id = '';
var comment_id = '541';

const ListItem = ({ item }) => {
  const datetime = new Date(item.time_added);
  return (
    <View style={styles.commentContainer}>
      {item.user_id == id ? (
        <>
          <View style={styles.commentLeft}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentTime}>{datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.commentRight}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentTime}>{datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </>
      )}
    </View>
  );
};


const SingleScreen = () => {
  const { user } = useContext(GlobalContext);
  id = user.user_id;
  var initialElements = [] // incase just sample comments 
  const [COMMENTS, setCOMMENTS] = useState(initialElements);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: '',
      file_id: '',
    },
  });
  const addComment = async () => {
    try {
      var newArray = ((await client.get(routes.comment.getByFile(comment_id), { headers: setJWT(user.token)})).data);
      setCOMMENTS(newArray);
    
      console.log(COMMENTS)
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (data) => {
    try {
      data.file_id = 541;
      client
        .post(routes.comment.post, data, { headers: setJWT(user.token) })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => console.error(e));
      addComment();
      console.log('hhhhh');
    } catch (error) {
      console.error(error);
    }
  };



  //addComment()


  useEffect(async () => {
    addComment()
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Image
          source={{
            uri: 'https://picsum.photos/id/1/200',
          }}
          style={styles.imgCover}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.titleTextField}>{'LoFrozen t-paita koko 98/104gin'}</Text>
        </View>
        <View>
          <Text style={styles.locationTextField}>{'Helsinki'}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View
            style={{
              height: '80%',
              marginBottom: 10,
            }}
          >
            <Icon
              styele={{ alignItems: 'flex-start' }}
              name="user-circle-o"
              type="font-awesome"
              color="white"
            />
            <FlatList
              data={COMMENTS}
              renderItem={
                ({ item }) => <ListItem item={item} />}
              showsHorizontalScrollIndicator={true}
              
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
              marginHorizontal: 15,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flex: 0.8,
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    multiline
                    autoCapitalize="none"
                    placeholder="Commments"
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    inputStyle={{
                      height: 40,
                      backgroundColor: 'rgba(96, 162, 23, 0.3)',
                      borderRadius: 24,
                      paddingHorizontal: 0,
                      fontSize: 20,
                      paddingHorizontal: 10,
                      marginTop: 8,
                      color: 'rgba(0, 0, 0, 0.42)',
                    }}
                  />
                )}
                name="comment"
              />

              {errors.comments && (
                <Text style={{ color: 'red', marginHorizontal: 18 }}>
                  This is required.
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 0.2,
              }}
            >
              <Button
                title="Send"
                onPress={handleSubmit(onSubmit)}
                loading={false}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                  height: 40,
                  backgroundColor: '#5F9A3B',
                  borderRadius: 24,
                  borderWidth: 0.1,
                  borderColor: 'white',
                  marginBottom: 0,
                }}
                containerStyle={{
                  alignItems: 'center',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
            
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
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginHorizontal: -20,
    marginBottom: 0,
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
    marginTop: 40,
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
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 30,
    borderColor: '#00000',
    boader: '2px',
    marginTop: 5,
  },
  imgCover: {
    width: Dimensions.get('window').width - 40,
    height: '100%',
    borderRadius: 40,
  },
  commentLeft: {
    flex: 1,
    alignItems: 'flex-end',
  },
  commentRight: {
    flex: 1,
    alignItems: 'flex-start',
  },
  commentText: {
    color: '#ffffff',
    fontSize:20,
  },
  commentTime: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});

export default SingleScreen;
