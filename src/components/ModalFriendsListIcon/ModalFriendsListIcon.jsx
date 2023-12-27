import style from './ModalFriendsListIcon.module.css';
import UserList from '../UserList/UserList';
import { arrayUnion } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserChatContext } from '../../context/UserChatContext';
import { v4 as uuidv4 } from 'uuid';

const ModalFriendsListIcon = ({ modalIconState, setModalIcon, selectedMessages }) => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(UserChatContext);
  const { data } = useContext(UserChatContext);

  const selectUserChat = async (e) => {
    const target = e.target.closest('li');

    if (!target) return;

    const user = chats.find(user => target.dataset.userId.trim() === user.uid);
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    dispatch({ type: "Change_UserChat", payload: user });

    selectedMessages.forEach(async ({ text, forwarded, id, senderName }) => {
      await updateDoc(doc(firestore, "chats", combinedId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          senderName,
          date: Date.now(),
          forwarded: true,
          originalSenderId: id,
        })
      });
    });

    const trimmedText = selectedMessages[selectedMessages.length - 1].text;

    await updateDoc(doc(firestore, "usersChats", currentUser.uid), {
      [combinedId + '.lastMessage']: (trimmedText.length > 20) ? trimmedText.slice(0, 20) + '...' : trimmedText,
      [combinedId + '.lastMessageStatus']: 'checked',
    });

    await updateDoc(doc(firestore, "usersChats", user.uid), {
      [combinedId + '.lastMessage']: (trimmedText.length > 20) ? trimmedText.slice(0, 20) + '...' : trimmedText,
      [combinedId + '.lastMessageStatus']: 'unchecked',
    });
  }

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = onSnapshot(doc(firestore, "usersChats", currentUser.uid), (doc) => {
      if (!doc.exists()) return;

      setChats(Object.values(doc.data()).map(obj => {
        return { lastMessage: obj.lastMessage, date: obj.date, ...obj.userInfo, lastMessageUserId: obj.senderId, lastMessageStatus: obj.lastMessageStatus };
      }));
    });

    return () => {
      unsub()
    }
  }, []);


  const closeModalIcon = () => {
    setModalIcon(false);
  };

  return (
    <div className={modalIconState ? style.modalIcon + " " + style.open : style.modalIcon} onClick={closeModalIcon}>
      <div className={style.body}>
        <h2>Select user to send</h2>
        <div className={style.wrapper}>
          <UserList onClick={selectUserChat} usersArray={chats} modalIconState={modalIconState} />
        </div>
        <div className={style.btnCont}>
          <button className='chat__primary-btn'>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ModalFriendsListIcon;