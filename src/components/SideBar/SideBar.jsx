import SearchInput from '../searchInput/SearchInput';
import UserList from '../UserList/UserList';
import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserChatContext } from '../../context/UserChatContext';

const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState('');
  const { dispatch } = useContext(UserChatContext);

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = onSnapshot(doc(firestore, "usersChats", currentUser.uid), (doc) => {
      if (!doc.exists()) return;

      setChats(Object.values(doc.data()).map(obj => {
        return { lastMessage: obj.lastMessage, date: obj.date, ...obj.userInfo, };
      }).sort((a, b) => b.date - a.date));
    });

    return () => {
      unsub()
    }
  }, []);

  const selectUserChatToAdd = (e) => {
    const target = e.target.closest('li');

    if (!target) return;

    const user = chats.find(user => target.dataset.userId.trim() === user.uid);

    dispatch({ type: "Change_UserChat", payload: user });
  }

  return (
    <div className="side-bar">
      <SearchInput props={{ setUsername, username }} />
      {
        !username.trim()
        &&
        <UserList onClick={selectUserChatToAdd} usersArray={chats} />
      }
    </div>
  );
}

export default SideBar;