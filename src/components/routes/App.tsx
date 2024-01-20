import React, {useState} from 'react';
import logo from './logo.svg';
import './../../style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './Todo';
import Home from './Home';
import Photos from './Photos';
import Albums from './Albums';
import Profile from './Profile';
import Login from './Login';
import Navbar from '../Navbar';
import { UserProvider } from './UserContext';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogin = (username: string, password: string) => {
      if (username !== '' && password !== '') {
        setLoggedIn(true);
      }
    };
  
    return (
      <UserProvider>
        <>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login onLogin={handleLogin} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
          </BrowserRouter>
        </>
      </UserProvider>
    );
  }
  
  export default App;