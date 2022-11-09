import { UserChatContext } from '../../context/UserChatContext';
import MessagesСontainer from '../MessagesContainer/MessagesContainer';
import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';
import { useContext } from 'react';
import SendMessageInput from '../SendMessageInput/SendMessageInput';


const Chat = () => {
  const { data } = useContext(UserChatContext);

  return (
    <div className='chat'>
      <div className='chat__head'>
        <h1 className='chat__header'>{data.user?.displayName}</h1>
      </div>
      <MessagesСontainer />
      <SendMessageInput />
    </div>
  );
}

export default Chat;
