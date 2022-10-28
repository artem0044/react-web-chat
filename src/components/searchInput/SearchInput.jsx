import React, { useState } from 'react';
import UserList from '../UserList/UserList';
import styles from './SearchInput.module.css'
import { getDocs, collection, } from "firebase/firestore";
import { firestore } from '../../firebase';
import { useCallback } from 'react';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useMemo } from 'react';

const SearchInput = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);


  const onChange = useCallback((e) => {
    setUsername(e.target.value);
  }, [])


  const trimmedUsername = useMemo(() => username.trim().toLowerCase(), [username]);

  useEffect(() => {
    if (!trimmedUsername) {
      setUsers([]);
      return;
    }

    if (!currentUser.displayName) return;

    const us = [];

    getDocs(collection(firestore, "users")).then((querySnapshot) => {
      querySnapshot.forEach(user => {

        if (user.data().email === currentUser.email) return;

        if (user.data().displayName.toLowerCase().trim().includes(trimmedUsername)) {
          us.push(user.data());
        }
      });

      setUsers(us);
    });
  }, [trimmedUsername]);


  return (
    <div className={styles.fieldContainer}>
      <input onChange={onChange} value={username} className={styles.searchInput} type="text" placeholder='Find a user' />
      <UserList usersArray={users} />
    </div>
  );
}

export default SearchInput;