import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/Registration/Login';
import ChatContainer from './components/ChatContainer/ChatContainer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Header from './components/Header/Header';

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const PrivateRoutes = () => {
    return (
      <Routes>
        <Route index path='/' element={<ChatContainer />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    )
  }

  const AuthRoutes = () => {
    return (
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    )
  }


  return (
    <div className="App" >
      <Header />
      {
        currentUser
          ?
          <PrivateRoutes />
          :
          <AuthRoutes />
      }
    </div >
  );
};

export default App;
