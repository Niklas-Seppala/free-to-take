import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DirectMessageForm from '../components/DirectMessageForm';
import ChatMessageList from '../components/ChatMessageList';
import useMediaComments from '../hooks/api/useMediaComments';

/**
 * The component for the comments screen
 *
 * @returns
 */
const ChatScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [comments, setComments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getCommentsByMedia = useMediaComments();

  const loadComments = async (x) => {
    if (!item) return;
    setIsRefreshing(true);
    const comments = await getCommentsByMedia(item.file_id);
    setComments(comments);
    setIsRefreshing(false);
  };

  useEffect(loadComments, [item]);

  return (
    <View style={styles.container}>
      <ChatMessageList
        style={{flex: 1}}
        media={item}
        data={comments}
        loadComments={loadComments}
        isRefreshing={isRefreshing}
        navigation={navigation}
      />
      <DirectMessageForm item={item} onMessageSent={loadComments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
