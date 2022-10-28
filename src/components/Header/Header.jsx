import styles from './Header.module.css'
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../../firebase';
import { useEffect } from 'react';

const Header = () => {
  const { currentUser, defaultAvatarImg } = useContext(AuthContext);
  const [fullname, setFullName] = useState([]);

  useEffect(() => {
    try {
      const docRef = doc(firestore, "users", currentUser.uid);
      getDoc(docRef).then(user => {
        // console.log(user.data().displayName, user.data().surname);
        setFullName([user.data().displayName, user.data().surname]);
      });
    } catch (err) {
      console.log(err);
    }

  }, [currentUser]);

  // useEffect(getUserInfo, [currentUser]);



  // const userInfo = useMemo(() => getUserInfo(), [currentUser]);
  // console.log(userInfo);

  const logOut = async () => {
    await signOut(auth);
  };



  return (
    <div className={styles.Header}>
      {
        currentUser
          ?
          <>
            <div className={styles.userInfo}>
              <img className='avatarImg' src={currentUser.photoURL || defaultAvatarImg} alt="" />
              {
                (!fullname[0] && !fullname[1])
                  ?
                  <></>
                  :
                  <p>{(fullname[0] + " " + fullname[1])}</p>
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