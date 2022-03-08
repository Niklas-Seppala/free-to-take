import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import LoginForm from '../components/LoginForm';
import DirectMessageForm from '../components/DirectMessageForm';
import ChatMessageList from '../components/ChatMessageList';

import useMediaComments from '../hooks/api/useMediaComments';

/**
 * 
 * 
 * @returns 
 */
const ChatScreen = ({route, navigation}) => {
  const { item } = route.params;

  const send_to_id = 684; //placeholder
  const chatMessageListFlatListRef = useRef();

  const [comments, setComments] = useState([]);
  const [lastMessageReloadTime, setLastMessageReloadTime] = useState(new Date().getTime());

  const getCommentsByMedia = useMediaComments();

  useEffect(
    async x => {
      if(!item) return;

      const comments = await getCommentsByMedia(item.file_id);
      console.log(item)
      console.log("GETTING COMMENTS")
      console.log("comments:",comments)
      setComments(comments);
      chatMessageListFlatListRef.current.scrollToEnd({animating: true});
    }, [lastMessageReloadTime, item]);

  return (
    <View style={{flex: 1, width: '100%', height:'100%', flexDirection:'column'}}>
      <ChatMessageList style={{flex:1}} data={comments} flatListRef={chatMessageListFlatListRef} navigation={navigation}/>
      <DirectMessageForm item={item} onMessageSent={
        () => {
          setLastMessageReloadTime(new Date().getTime());
        }
      }/>
    </View>
  );
};

export default ChatScreen;