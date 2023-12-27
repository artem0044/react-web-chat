import styles from './UserList.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { UserChatContext } from '../../context/UserChatContext';
const { item, unchecked } = styles;

const UserList = ({ usersArray, onClick, onContextMenu, modalIconState }) => {
  const { defaultAvatarImg } = useContext(AuthContext);
  const { data } = useContext(UserChatContext);
  const { currentUser } = useContext(AuthContext);
  const [lastMessageStatus, setLastMessageStatus] = useState('unchecked');

  return (
    <ul onClick={onClick} onContextMenu={onContextMenu} className={modalIconState ? styles.userList + " " + styles.modified : styles.userList}>
      {
        usersArray?.sort((a, b) => b.date - a.date).map(user => {
          return <li data-user-id={user.uid} className={user.lastMessageStatus === 'unchecked' ? item + ' ' + unchecked : item} key={user.uid}>
            <img src={user.photoURL} alt="" />
            <div>
              <p className={styles.username}>{user.displayName}</p>
              <p className={styles.lastMessage}>{user.lastMessage}</p>
            </div>
            <div>

            </div>
          </li>
        })
      }
    </ul >
  );
}

export default UserList;