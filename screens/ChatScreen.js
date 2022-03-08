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

  const [comments, setComments] = useState([]);
  const [lastMessageReloadTime, setLastMessageReloadTime] = useState(new Date().getTime());

  const getCommentsByMedia = useMediaComments();

  const loadComments = async x => {
      if(!item) return;
      console.log("Triggering reload")
      const comments = await getCommentsByMedia(item.file_id);
      setComments(comments);
  }

  useEffect(loadComments, [item]);



  return (
    <View style={{flex: 1, width: '100%', height:'100%', flexDirection:'column'}}>
      <ChatMessageList style={{flex:1}} media={item} data={comments} navigation={navigation}/>
      <DirectMessageForm
        send_to_id={send_to_id}
        item={item} 
        onMessageSent={loadComments}
      />
    </View>
  );
};

export default ChatScreen;