import styles from './Header.module.css'
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from '../../firebase';
import { useEffect } from 'react';
import { UserChatContext } from '../../context/UserChatContext';

const Header = () => {
  const { currentUser, defaultAvatarImg } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    photoURL: '',
  });
  const { dispatch } = useContext(UserChatContext);

  useEffect(() => {
    if (!currentUser?.uid) {
      return;
    }

    const unsub = onSnapshot(doc(firestore, "users", currentUser.uid), (doc) => {
      if (!doc.exists()) return;

      setUserInfo({
        name: doc.data().displayName,
        surname: doc.data().surname,
        photoURL: doc.data().photoURL,
      })
    });

    return () => {
      unsub();
    }

  }, [currentUser?.uid]);

  const logOut = async () => {
    setUserInfo({});
    dispatch({ type: "Change_UserChat", payload: {} })
    await signOut(auth);
  };



  return (
    <div className={styles.Header}>
      {
        currentUser
          ?
          <>
            <div className={styles.userInfo}>
              <img className='avatarImg' src={userInfo.photoURL} alt="" />
              {
                (!userInfo.name && !userInfo.surname)
                  ?
                  <p>Username</p>
                  :
                  <p>{(userInfo.name + " " + userInfo.surname)}</p>
              }
            </div>
            <button onClick={logOut} className={styles.LogOutBtn}>Log out</button>
          </>
          :
          <h1 className={styles.header}>Chatartem</h1>
      }
    </div >
  );
}

export default Header;