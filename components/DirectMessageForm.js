import { useContext, useEffect, React } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import useCommentPost from '../hooks/api/useCommentPost';
import useMediaTags from '../hooks/api/useMediaTags';
import useTagPost from '../hooks/api/useTagPost';

import { TAG, TAG_PART_RES } from '../utils/api';


import AsyncStorage from '@react-native-async-storage/async-storage';

import { GlobalContext } from '../context/GlobalContext';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Toast from 'react-native-toast-message';
import colors from '../utils/colors';

const DirectMessageForm = ({ navigation, onEditSuccess, item }) => {
  const { setUser, user } = useContext(GlobalContext);

  const postComment = useCommentPost();
  const postTag = useTagPost();
  const getTagsByMedia = useTagPost();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      commentText: '',
    },
  });

  /**
    Check if the user has already posted a comment on this item
  */
  const canPost = item => {
    const userTag = `${TAG}${TAG_PART_RES}${user.user_id}`;
    console.log("userTag", userTag, item.tags, item.tags.indexOf(userTag))
    return item.tags.indexOf(userTag) == -1
  };

  const onSubmit = async (data) => {
    const resp = await postComment(data.commentText, item).then(
      r => {
        const resp = postTag(
          `${TAG_PART_RES}${user.user_id}`, // indicates the user is interested in the item
          item
        );
      }
    );

    // post 
    console.log("Comment resp",resp)
  };

  const showErrorMsg = () => {
    Toast.show({
      type: 'error',
      text1: 'Please fill all the form fields',
    });
  };




  return (
    <View style={{ width: '100%', height: '100%' }}>
      <TouchableOpacity
        style={{ flex: 1, width: '100%', height: '90%', justifyContent: 'flex-end' }}
        activeOpacity={1}
      >
        <KeyboardAwareScrollView
          style={{ width: '75%' }}
          keyboardShouldPersistTaps={'always'}
          style={{ flex: 1, width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{ width: '100%' }}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="commentText"
          />

          <View style={styles.buttonContainer}>
            <Button
              containerStyle={{ width: '100%', marginBottom: 5 }}
              buttonStyle={styles.button}
              title="Send message"
              disabled={canPost(item)}
              onPress={handleSubmit(onSubmit)}
            ></Button>
            <Button
              containerStyle={{ width: '100%' }}
              buttonStyle={styles.button}
              title="Cancel"
            ></Button>
          </View>
        </KeyboardAwareScrollView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    height: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});

export default DirectMessageForm;
