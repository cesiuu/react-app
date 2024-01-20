import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import './../../style/profile.css';

function Profile() {
  useEffect(() => {
    document.title = "Profile"
 }, []);
  const { currentUser } = useContext(UserContext);

  return (
    <div className="profile-container">
      {currentUser ? (
        <>
          <div className="profile-details">
            <h2>Account information</h2>
            <h3>Name: {currentUser.name}</h3>
            <h3>Email: {currentUser.email}</h3>
            <h3>Street: {currentUser.address.street}</h3>
            <h3>Suite: {currentUser.address.suite}</h3>
            <h3>City: {currentUser.address.city}</h3>
            <h3>Zip code: {currentUser.address.zipcode}</h3>
          </div>
        </>
      ) : (
        <div className="profile-guest">
          <h2>Welcome, Guest!</h2>
        </div>
      )}
    </div>
  );
}

export default Profile;