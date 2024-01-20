import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './../style/navbar.css';

const Navbar: React.FC =( ) => {
    return(
        <>
         <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/photos">Photos</Link>
          </li>
          <li>
            <Link to="/albums">Albums</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
        </ul>
      </nav></>
    )
}

export default Navbar