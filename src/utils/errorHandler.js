const errorHandler = (err, setErrors) => {
  switch (err.code) {
    case "auth/email-already-in-use":
      setErrors(prev => ({ ...prev, email: 'Email already exists' }));
      break;
    case "auth/user-not-found":
      setErrors(prev => ({ ...prev, password: "Invalid password or email", email: "Invalid password or email" }));
      break;
    case "auth/wrong-password":
      setErrors(prev => ({ ...prev, password: "Invalid password or email", email: "Invalid password or email" }));
      break;
    default:
      console.log(err);
      break;
  }
}
export default errorHandler;