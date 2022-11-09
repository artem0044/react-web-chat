import { useState, createContext, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const UserChatContext = createContext();

export const UserChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  const INITIAL_STATE = {
    user: {},
    chatId: 'null',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "Change_UserChat":
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <UserChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </UserChatContext.Provider>
  )
}