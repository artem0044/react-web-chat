import styles from './UserList.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';

const UserList = ({ usersArray, onClick }) => {
  const { defaultAvatarImg } = useContext(AuthContext);
  const [sortedUsersArray, setSortedUsersArray] = useState([]);

  // const sortedUsersArray = useMemo(() => {
  //   if()
  //   usersArray.sort((a, b) => b.date - a.date)
  // }, []);

  return (
    <ul onClick={onClick} className={styles.userList}>
      {
        usersArray?.map(user => {
          return <li data-user-id={user.uid} className={styles.item} key={user.uid}>
            <img src={user.photoURL} alt="" />
            <div>
              <p className={styles.username}>{user.displayName}</p>
              <p className={styles.lastMessage}>{user.lastMessage}</p>
            </div>
          </li>
        })
      }
    </ul >
  );
}

export default UserList;