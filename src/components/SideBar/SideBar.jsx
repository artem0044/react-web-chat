import SearchInput from '../searchInput/SearchInput';
import UserList from '../UserList/UserList';
import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { onSnapshot, doc, updateDoc, deleteField, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserChatContext } from '../../context/UserChatContext';
import styles from '../UserList/UserList.module.css';
import Contextmenu from '../contextmenu/Contextmenu';
const { unchecked } = styles;

const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const { dispatch } = useContext(UserChatContext);
  const { data } = useContext(UserChatContext);

  const selectUserChatToAdd = async (e) => {
    const target = e.target.closest('li');

    if (!target) return;

    const user = chats.find(user => target.dataset.userId.trim() === user.uid);


    dispatch({ type: "Change_UserChat", payload: user });

    await updateDoc(doc(firestore, "usersChats", currentUser.uid), {
      [(currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid) + '.lastMessageStatus']: 'checked',
    });

    target.classList.remove(unchecked);
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

  const deleteFriend = async (e, data) => {
    if (!data.fieldName) return;

    const combinedId = currentUser.uid > userId ? currentUser.uid + userId : userId + currentUser.uid;

    switch (data.fieldName) {
      case 'delete': {
        await updateDoc(doc(firestore, 'usersChats', currentUser.uid), {
          [combinedId]: deleteField()
        });

        await updateDoc(doc(firestore, 'usersChats', userId), {
          [combinedId]: deleteField()
        });

        await deleteDoc(doc(firestore, 'chats', combinedId));
      }
    }
  }

  const getUserId = (e) => {
    const target = e.target.closest('li');

    if (!target) return;

    const user = chats.find(user => target.dataset.userId.trim() === user.uid);

    setUserId(user.uid);
  }

  return (
    <div className="side-bar">
      <SearchInput props={{ setUsername, username }} />
      {
        !username.trim()
        &&
        <Contextmenu menuItems={[{ fieldName: 'delete' }, { fieldName: 'add' }]} handleClick={deleteFriend}>
          <UserList onContextMenu={getUserId} onClick={selectUserChatToAdd} usersArray={chats} />
        </Contextmenu>
      }
    </div >
  );
}

export default SideBar;