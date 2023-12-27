import { UserChatContext } from '../../context/UserChatContext';
import { onSnapshot, doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import MessagesСontainer from '../MessagesContainer/MessagesContainer';
import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';
import { useContext, useState } from 'react';
import SendMessageInput from '../SendMessageInput/SendMessageInput';
import { arrayRemove } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import ModalFriendsListIcon from '../ModalFriendsListIcon/ModalFriendsListIcon';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const { data } = useContext(UserChatContext);
  const [btnVisibility, setBtnVisibility] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [modalIcon, setModalIcon] = useState(false);

  useEffect(() => {
    if (!btnVisibility) return;

    setBtnVisibility(false);
  }, [data.chatId]);

  const deleteSelectedMsgs = () => {
    setSelectedMessages([]);

    updateDoc(doc(firestore, "chats", data.chatId), {
      messages: arrayRemove(...selectedMessages)
    });
    onSnapshot(doc(firestore, "chats", data.chatId), async (item) => {
      if (!item.exists()) return;

      let lastMsg = item.data().messages[item.data().messages.length - 1]?.text;
      if (!lastMsg) {
        setBtnVisibility(false);
        lastMsg = '';
      }

      await updateDoc(doc(firestore, "usersChats", currentUser.uid), {
        [data.chatId + '.lastMessage']: (lastMsg.length > 20) ? lastMsg.slice(0, 20) + '...' : lastMsg,
      });

      await updateDoc(doc(firestore, "usersChats", data.user.uid), {
        [data.chatId + '.lastMessage']: (lastMsg.length > 20) ? lastMsg.slice(0, 20) + '...' : lastMsg,
      });
    });
  }

  const cancelEditing = () => {
    setBtnVisibility(false);
  }

  const editMsg = async () => {
    const selectedMsg = selectedMessages[selectedMessages.length - 1];
    const lastMsg = messages[messages.length - 1];

    if (!text) return;

    setText('');
    setBtnVisibility(false);


    if (selectedMsg.id === lastMsg.id) {
      await updateDoc(doc(firestore, "usersChats", currentUser.uid), {
        [data.chatId + '.lastMessage']: (text.length > 20) ? text.slice(0, 20) + '...' : text,
      });

      await updateDoc(doc(firestore, "usersChats", data.user.uid), {
        [data.chatId + '.lastMessage']: (text.length > 20) ? text.slice(0, 20) + '...' : text,
      });
    }


    const updatedMsgs = messages.map(msg => {
      if (msg.id !== selectedMsg.id) return msg;
      msg.id = uuidv4();
      msg.text = text;
      msg.date = Date.now();
      return msg;
    });

    await setDoc(doc(firestore, "chats", data.chatId), {
      messages: arrayUnion(...updatedMsgs)
    });

  }

  const forwardMsg = () => {
    setModalIcon(true)
  };

  return (
    <div className='chat'>
      <div className='chat__head'>
        <h1 className='chat__header'>{data.user?.displayName}</h1>
        {
          btnVisibility
          &&
          <div className="chat__btn-container">
            <button className='chat__primary-btn' onClick={deleteSelectedMsgs} disabled={selectedMessages.some(msg => msg.senderId !== currentUser.uid)}>delete {selectedMessages.length || ''}</button>
            <button className='chat__primary-btn' onClick={editMsg} disabled={selectedMessages.some(msg => msg.senderId !== currentUser.uid)}>edit</button>
            <button className='chat__primary-btn' onClick={forwardMsg} >forward</button>
            <button className='chat__primary-btn' onClick={cancelEditing} >cancel</button>
          </div>
        }
      </div>
      {
        (data.chatId === 'null')
          ?
          <div className='modalIcon'>Choose a chat</div>
          :
          <>
            <MessagesСontainer messages={messages} setMessages={setMessages} btnVisibility={btnVisibility} setBtnVisibility={setBtnVisibility} selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages} />
            <SendMessageInput text={text} setText={setText} />
          </>
      }
      {modalIcon && <ModalFriendsListIcon selectedMessages={selectedMessages} modalIconState={modalIcon} setModalIcon={setModalIcon} />}
    </div>
  );
}

export default Chat;
