import { arrayUnion, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useState, useContext } from "react";
import { UserChatContext } from "../../context/UserChatContext";
import { firestore } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../context/AuthContext";
import { useMemo } from "react";


const SendMessageInput = ({ text, setText }) => {

  const [file, setFile] = useState('');
  const { data } = useContext(UserChatContext);
  const { currentUser } = useContext(AuthContext);

  const trimmedText = useMemo(() => text.trim(), [text]);


  const sendMessage = async () => {
    if (!trimmedText) return;

    setText('');
    setFile('');

    await updateDoc(doc(firestore, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        senderId: currentUser.uid,
        senderName: currentUser.displayName,
        text: trimmedText,
        date: Date.now(),
      })
    });

    await updateDoc(doc(firestore, "usersChats", currentUser.uid), {
      [data.chatId + '.lastMessage']: (trimmedText.length > 20) ? trimmedText.slice(0, 20) + '...' : trimmedText,
      [data.chatId + '.lastMessageStatus']: 'checked',
      [data.chatId + '.senderId']: currentUser.uid,
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(firestore, "usersChats", data.user.uid), {
      [data.chatId + '.lastMessage']: (trimmedText.length > 20) ? trimmedText.slice(0, 20) + '...' : trimmedText,
      [data.chatId + '.lastMessageStatus']: 'unchecked',
      [data.chatId + '.senderId']: currentUser.uid,
      [data.chatId + '.date']: serverTimestamp(),
    });
  }

  const sendWithEnter = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }
  return (
    <label htmlFor="textarea" className='chat__send-message-field'>
      <textarea name="area" onKeyDown={sendWithEnter} id="textarea" value={text} onChange={e => setText(e.target.value)} placeholder='....'></textarea>
      <label htmlFor="file">
        <input type="file" onChange={e => setFile(e.target.files[0])} name="file" id="file" />
        <div className="chat__send-img-btn"></div>
      </label>
      <button className='chat__primary-btn' onClick={sendMessage} >send</button>
    </label>
  );
}

export default SendMessageInput;