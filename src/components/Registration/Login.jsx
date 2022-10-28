import React from "react"
import { useState } from "react"
import Form from '../Form/Form';
import styles from './RegAndLogin.module.css';
import { fieldValidators } from "../../utils/validators";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import errorHandler from "../../utils/errorHandler.js";

const Login = () => {
  const fieldInfo = [
    { label: 'Email', id: 'email', type: 'text', validators: fieldValidators.email },
    { label: 'Password', id: 'password', type: 'password', validators: fieldValidators.password },
  ];
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logIn = async (data, setErrors) => {
    try {
      // setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      errorHandler(err, setErrors);
    }
  };


  return (

    <div  className={styles.RegAndLogin}>
    
            <h1 className={styles.header}>Login</h1>
            <Form fieldInfo={fieldInfo} templateName={'login'} sendDate={logIn} />
  

    </div>
  );
}

export default Login;