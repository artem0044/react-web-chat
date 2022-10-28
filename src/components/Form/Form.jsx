import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import RegistrationButton from "../RegButton/RegistrationButton";
import { Link } from "react-router-dom";
import styles from './Form.module.css'

// const useEffect_ = (fn, dep) => {
//   if (!useEffect_._mem.dep || dep.some((d, i) => useEffect_._mem.dep[i] !== d)) {
//     useEffect_._mem.onUnmount?.();
//     useEffect_._mem.onUnmount = fn();
//     useEffect_._mem.dep = dep;
//   }
// };
// useEffect_._mem = {};



const Form = ({ fieldInfo, templateName, sendDate }) => {

  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});


  const checkForm = () => {
    const __err = fieldInfo.reduce((acc, { id, validators }) => {
      const err = validators?.map(validator => validator(userData[id])).find(error => error);
      acc[id] = err ? err : null;

      return acc;
    }, {});

    setErrors(__err);

    if (Object.values(__err).some(error => error)) {
      console.log('find error')
      return false;
    }

    return true;
  }



  const submit = (e) => {
    e.preventDefault();

    if (checkForm()) {
      sendDate(userData, setErrors);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      {fieldInfo.map(fieldInfo =>
        <FormInput
          key={fieldInfo.id}
          setUserData={setUserData}
          fieldProps={fieldInfo}
          error={errors[fieldInfo.id]}
          value={userData[fieldInfo.id]}
        />)}
      <RegistrationButton >{templateName}</RegistrationButton >
      {templateName == 'registration' ? <Link style={{ display: 'flex', justifyContent: 'center' }} to={'/login'}> Have you already sign up ? Log in</Link> : <Link style={{ display: 'flex', justifyContent: 'center' }} to={'/registration'}>No account yet ? Sign up</Link>}
    </form>
  );
}

export default Form;