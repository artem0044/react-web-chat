import MessagesСontainer from '../MessagesContainer/MessagesContainer';
import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chat__head'>
        <h1 className='chat__header'>Username</h1>
      </div>
      <MessagesСontainer />
      <label htmlFor="textarea" className='chat__send-message-field'>
        <textarea name="area" id="textarea" placeholder='....'></textarea>
        <button className='chat__primary-btn'>send</button>
      </label>
    </div>
  );
}

export default Chat;
