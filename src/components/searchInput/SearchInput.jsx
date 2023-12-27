import React, { useState } from 'react';
import UserList from '../UserList/UserList';
import styles from './SearchInput.module.css'
import { getDocs, collection, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from '../../firebase';
import { useCallback } from 'react';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useMemo } from 'react';
import { UserChatContext } from '../../context/UserChatContext';

const SearchInput = ({ props: { setUsername, username } }) => {

  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(UserChatContext);

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

  const addUserChat = async (event) => {
    const target = event.target.closest('li');

    if (!target) return;

    const user = users.find(user => target.dataset.userId.trim() === user.uid);

    if (!user) {
      console.log('User is not found')
      return;
    }

    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(firestore, "chats", combinedId));
      console.log(res);
      if (!res.exists()) {
        await setDoc(doc(firestore, "chats", combinedId), { messsages: [] });

        dispatch({ type: "Change_UserChat", payload: user });

        await updateDoc(doc(firestore, "usersChats", currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(firestore, "usersChats", user.uid.trim()), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
            displayName: currentUser.displayName
          },
          [combinedId + '.date']: serverTimestamp(),
        });

      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.fieldContainer}>
      <input onChange={onChange} value={username} className={styles.searchInput} type="text" placeholder='Find a user' />
      <UserList onClick={addUserChat} usersArray={users} />
    </div>
  );
}

export default SearchInput;                   