import React from "react"
import Form from '../Form/Form';
import styles from './RegAndLogin.module.css';
import { fieldValidators } from "../../utils/validators";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase.js";
import { auth } from "../../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { updateDoc } from "firebase/firestore";

const Registration = () => {
  const navigate = useNavigate();

  const fieldInfo = [
    { label: 'Name', id: 'name', type: 'text', validators: fieldValidators.name },
    { label: 'Surname', id: 'surname', type: 'text', validators: fieldValidators.surname },
    { label: 'Email', id: 'email', type: 'email', validators: fieldValidators.email },
    { label: 'Password', id: 'password', type: 'password', validators: fieldValidators.password },
    { label: 'Add the picture', id: 'file', type: 'file', },
  ];

  const register = async (data, setErrors) => {

    try {
      const userCreditals = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const storageRef = ref(storage, data.name);


      await setDoc(doc(firestore, "users", userCreditals.user.uid), {
        displayName: data.name,
        surname: data.surname,
        email: data.email,
        photoURL: null,
      });

      await setDoc(doc(firestore, "usersChats", userCreditals.user.uid), {});


      uploadBytesResumable(storageRef, data.file).then(async () => {
        const url = await getDownloadURL(storageRef);
        console.log(url);

        const userRef = doc(firestore, "users", userCreditals.user.uid);

        await updateDoc(userRef, {
          photoURL: url
        });

        await updateProfile(userCreditals.user, {
          displayName: data.name,
          photoURL: url,
        });

      })

      // uploadTask.on(
      //   (error) => {
      //     console.log(error);
      //   },
      //   () => {
      //     console.log(1);
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //         const userRef = doc(firestore, "users", userCreditals.user.uid);

      //         await updateDoc(userRef, {
      //           photoURL: downloadURL
      //         });

      //         await updateProfile(userCreditals.user, {
      //           displayName: data.name,
      //           photoURL: downloadURL,
      //         });
      //       });
      //   }
      // );

      navigate('/');

    } catch (res) {
      switch (res.code) {
        case "auth/email-already-in-use":
          setErrors(prev => ({ ...prev, email: 'Email already exists' }));
          break;
        default:
          console.log(res);
          break;
      }

    };
  };

  return (
    <div className={styles.RegAndLogin}>
      <h1 className={styles.header}>Registration</h1>
      <Form fieldInfo={fieldInfo} templateName={'registration'} sendDate={register} />
    </div>
  );
}

export default Registration;