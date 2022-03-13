import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import LoginForm from '../components/LoginForm';
import DirectMessageForm from '../components/DirectMessageForm';
import ChatMessageList from '../components/ChatMessageList';

import useMediaComments from '../hooks/api/useMediaComments';

/**
 * The component for the comments screen
 * 
 * @returns 
 */
const ChatScreen = ({route, navigation}) => {
  const { item } = route.params;


  const [comments, setComments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastMessageReloadTime, setLastMessageReloadTime] = useState(new Date().getTime());

  const getCommentsByMedia = useMediaComments();

  const loadComments = async x => {
      if(!item) return;
      setIsRefreshing(true)
      console.log("Triggering reload, isRefreshing")
      const comments = await getCommentsByMedia(item.file_id);
      setComments(comments);
      setIsRefreshing(false);
  }

  useEffect(loadComments, [item]);



  return (
    <View style={{flex: 1, width: '100%', height:'100%', flexDirection:'column'}}>
      <ChatMessageList media={item} data={comments} loadComments={loadComments} isRefreshing={isRefreshing} navigation={navigation}/>
      <DirectMessageForm
        item={item} 
        onMessageSent={loadComments}
      />
    </View>
  );
};

export default ChatScreen;