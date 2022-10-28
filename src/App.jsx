import './App.css';
import Registration from './components/Registration/Registration';
import Login from './components/Registration/Login';
import ChatContainer from './components/ChatContainer/ChatContainer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children;
  }


  return (
    <div className="App" >
      <Header />
      <Routes >
        <Route index path='/' element={
          <ProtectedRoute>
            <ChatContainer />
          </ProtectedRoute>
        } />
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='*' element={<div >Not found</div>} />
      </Routes >
    </div >
  );
};

export default App;
