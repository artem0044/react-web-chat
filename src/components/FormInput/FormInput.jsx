import { useCallback } from 'react';
import styles from './FormInput.module.css'

const FormInput = ({ fieldProps, value, setUserData, error }) => {
  const { label, type, id } = fieldProps;

  const onChange = useCallback(
    (event) => {
      if (type == 'file') {
        setUserData((prev) => ({ ...prev, [fieldProps.id]: event.target.files[0] }));
        return;
      }
      setUserData((prev) => ({ ...prev, [fieldProps.id]: event.target.value }))
    },

    [id],
  );

  return (
    <div className={styles.field}>
      {type == 'file'
        ?
        <>
          <label htmlFor={id} className={styles['label']} style={{ padding: '10px', borderRadius: '7px' }} >{label}</label>
          <input onChange={onChange} files={value} style={{ display: 'none' }} id={id} type={type} className={styles['input']} />
        </>
        :
        <>
          <label htmlFor={id} className={styles['label']}>{label}</label>
          <input onChange={onChange} id={id} type={type} className={styles['input']} value={value} />
          <span className={styles['error-message']}>{error}</span>
        </>
      }
    </div>
  );
}

export default FormInput;