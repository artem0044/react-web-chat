import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';
import { useContext, useEffect, useState, useRef } from 'react';
import { UserChatContext } from '../../context/UserChatContext';
import { AuthContext } from '../../context/AuthContext';
import Contextmenu from '../contextmenu/Contextmenu';
import { Dropdown, Menu } from "antd";
import { connectAuthEmulator } from 'firebase/auth';

const menu = (
  <Menu items={
    [
      { label: 'edit', key: 'edit' },
      { label: 'del', key: 'del' }
    ]
  } />
)

const Message = ({ message, btnVisibility, setBtnVisibility, messageId, selectedMessages, setSelectedMessages }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(UserChatContext);
  const parentRef = useRef(null);


  useEffect(() => {
    if (!btnVisibility && selectedMessages.length) {

      parentRef.current.classList.remove('ready-to-be-deleted');
    }
  }, [btnVisibility]);

  const choseToDelete = (e) => {
    // if (!e.target.closest('.Message').classList.contains('owner')) return;
    if (btnVisibility) return;

    setBtnVisibility(true);

    setSelectedMessages([message]);

    e.target.closest('.Message').classList.add('ready-to-be-deleted');
  }

  const choseOneMoreToDelete = (e) => {
    const target = e.target.closest('.Message');

    // if (!target.classList.contains('owner')) return;

    if (btnVisibility) {
      target.classList.toggle('ready-to-be-deleted');

      if (!target.classList.contains('ready-to-be-deleted')) {
        setSelectedMessages(selectedMessages.filter(item => item.id !== messageId));

        return;
      }

      setSelectedMessages([...selectedMessages, message]);
    }

    return;
  }

  return (
    <div ref={parentRef} onDoubleClick={choseToDelete} onClick={choseOneMoreToDelete} className={currentUser.uid === message.senderId ? 'Message owner' : 'Message'}>


      <div className="Message__info">
        <img src={currentUser.uid === message.senderId ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>{new Date(message.date).getHours() + ':' + (new Date(message.date).getMinutes() <= 9 ? (  '0' + new Date(message.date).getMinutes()) : new Date(message.date).getMinutes())}</span>
      </div>

      <div className="Message__content">
        <div>
          {
            message.forwarded && <h4>Forwarded from {message.senderName}</h4>
          }
          <p>{message.text}</p>
        </div>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Message;