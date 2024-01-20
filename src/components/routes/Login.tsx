import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './../../style/login.css';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const matchingUser = users.find(
        (user: User) => user.username === username && user.email === password
      );

      if (matchingUser) {
        onLogin(username, password);
        setCurrentUser(matchingUser);

        navigate('/profile');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    document.title = "Login"
 }, []);

  return (
    <div className="loginContainer">
      <h2 className="loginHeader">Login</h2>
      <form className="form">
        <div className="inputGroup">
          <label className="label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputField"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputField"
          />
        </div>
        <button type="button" onClick={handleLogin} className="loginButton">
          Login
        </button>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
