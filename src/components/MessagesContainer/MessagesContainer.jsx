import { onSnapshot, doc } from 'firebase/firestore';
import { useCallback, useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import { UserChatContext } from '../../context/UserChatContext';
import { firestore } from '../../firebase';
import Message from '../Messages/Message';
import styles from './MessagesContainer.module.css';

import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';

const MessagesСontainer = () => {
  const { data } = useContext(UserChatContext);
  const [messages, setMessages] = useState([]);

  const parentRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!parentRef.current) return;

    parentRef.current.scrollTo(0, parentRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    onSnapshot(doc(firestore, "chats", data.chatId), (doc) => {
      if (!doc.exists()) return;

      setMessages(doc.data().messages);
    });
  }, [data.chatId]);

  const togglingGetDownBtnVisibility = useCallback(() => {
    if ((parentRef.current?.scrollTop + parentRef.current?.offsetHeight) >= parentRef.current?.scrollHeight) {

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
        messages?.map(message => <Message message={message} parent={parentRef.current} />)
      }
      < div ref={btnRef} onClick={getDown} className="messagesContainer__get-down-btn"></div>
    </div >
  );
}

export default MessagesСontainer;