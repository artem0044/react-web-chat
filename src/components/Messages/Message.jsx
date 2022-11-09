import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';
import { useContext, useEffect } from 'react';
import { UserChatContext } from '../../context/UserChatContext';
import { AuthContext } from '../../context/AuthContext';

const Message = ({ message, parent }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(UserChatContext);

  return (
    <div className={currentUser.uid === message.senderId ? 'Message owner' : 'Message'}>
      <div className="Message__info">
        <img src={currentUser.uid === message.senderId ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>just now</span>
      </div>

      <div className="Message__content">
        <p>{message.text}</p>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Message;