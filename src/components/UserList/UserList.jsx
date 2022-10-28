import styles from './UserList.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';

const UserList = ({ usersArray }) => {
  const { defaultAvatarImg } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   setUsers(users);
  // }, [usersArray]);

  return (
    <ul className={styles.userList}>
      {
        usersArray?.map(user => {
          return <li className={styles.item} key={user.email}>
            <img src={user.photoURL || defaultAvatarImg} alt="" />
            <div>
              <p className={styles.username}>{user.displayName}</p>
              <p className={styles.lastMessage}>last message</p>
            </div>
          </li>
        })
      }
    </ul >
  );
}

export default UserList;