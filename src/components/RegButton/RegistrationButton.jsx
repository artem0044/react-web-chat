import styles from './RegstrationButton.module.css';

const RegistrationButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.RegBtn}>{children}</button>
  );
}

export default RegistrationButton;