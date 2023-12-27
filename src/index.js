import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { UserChatContextProvider } from './context/UserChatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <AuthContextProvider>
        <UserChatContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserChatContextProvider>
    </AuthContextProvider>
);

