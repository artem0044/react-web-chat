import { useState, createContext, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();
const defaultAvatarImg = 'https://management-datascience.org/wp-content/plugins/management-and-datascience/mdsf-templates/img/default-avatar.jpg'

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {

      setCurrentUser(user);

    });

    return () => {
      unsub();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, defaultAvatarImg }}>
      {children}
    </AuthContext.Provider>
  )
}