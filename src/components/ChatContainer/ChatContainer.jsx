import React from "react";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css'

const ChatContainer = () => {
  return (
    <div className='ChatContainer'>
      <SideBar />
      <Chat />
    </div>
  );
}

export default ChatContainer;