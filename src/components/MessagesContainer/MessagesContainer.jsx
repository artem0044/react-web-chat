import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useCallback, useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import { UserChatContext } from '../../context/UserChatContext';
import { firestore } from '../../firebase';
import Message from '../Messages/Message';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../context/AuthContext';
import styles from './MessagesContainer.module.css';
import Contextmenu from '../contextmenu/Contextmenu';

import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';

const MessagesСontainer = ({ btnVisibility, setBtnVisibility, selectedMessages, setSelectedMessages, messages, setMessages }) => {
  const { data } = useContext(UserChatContext);

  const parentRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!parentRef.current) return;
    btnRef.current.classList.add('_IsNotVisible');
    parentRef.current.scrollTo(0, parentRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    onSnapshot(doc(firestore, "chats", data.chatId), (doc) => {
      if (!doc.exists()) return;

      setMessages(doc.data().messages);
    });
  }, [data.chatId]);

  const togglingGetDownBtnVisibility = useCallback(() => {
    if ((parentRef.current?.scrollTop + parentRef.current?.offsetHeight + 300) >= parentRef.current?.scrollHeight) {

      btnRef.current.classList.add('_IsNotVisible');
      return;
    }

    btnRef.current.classList.remove('_IsNotVisible');
    btnRef.current.classList.add('_IsVisible');
  }, []);

  const getDown = () => {
    parentRef.current.scrollTo(0, parentRef.current.scrollHeight);
  }

  return (
    <div ref={parentRef} onScroll={togglingGetDownBtnVisibility} className="messagesContainer" >
      {
        messages?.map(message => <Message  messages={messages} selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages} btnVisibility={btnVisibility} setBtnVisibility={setBtnVisibility} message={message} parent={parentRef.current} key={message.id} messageId={message.id} />)
      }
      <div className='messagesContainer__button-wrapper'>
        < div ref={btnRef} onClick={getDown} className="messagesContainer__get-down-btn"></div>
      </div>
    </div >
  );
}

export default MessagesСontainer;