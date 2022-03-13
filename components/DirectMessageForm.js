import {React} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import useCommentPost from '../hooks/api/useCommentPost';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../utils/colors';

const DirectMessageForm = ({onMessageSent, item}) => {
  const postComment = useCommentPost();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      commentText: '',
    },
  });

  const onSubmit = async (data) => {
    await postComment(data.commentText, item).then((x) => {
      reset();
      onMessageSent();
    });
  };

  return (
    <View style={{width: '100%', height: '30%'}}>
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          height: '90%',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
      >
        <KeyboardAwareScrollView
          style={{width: '75%', flex: 1, width: '100%'}}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                leftIcon={{size: 20, name: 'comment', color: colors.main}}
                placeholder="Comment"
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
              containerStyle={{width: '100%'}}
              buttonStyle={styles.button}
              title="Send message"
              onPress={handleSubmit(onSubmit)}
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
    height: '5%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});

export default DirectMessageForm;
