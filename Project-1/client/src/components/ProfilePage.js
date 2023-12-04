import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const userId = localStorage.getItem('userId');
 useEffect(() => {
  axios.get(`http://localhost:8080/api/v1/users/${userId}`)
    .then(response => {
      setUser(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      setError('Error fetching user');
      setLoading(false);
    });
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;
  return (
    <div>
    <h1>User Profile</h1>
    {user && (
      <div>
        <h2>{user.userFirstName} {user.userLastName}</h2>
        <div>
  <img src={user.userPicture} alt="Profile" />
  <p>Title: {user.userTitle}</p>
  <p>First Name: {user.userFirstName}</p>
  <p>Last Name: {user.userLastName}</p>
  <p>Email: {user.userEmail}</p>
  <p>Date of Birth: {user.userDateOfBirth}</p>
  {/* Add other fields as needed */}
</div>
      </div>
    )}
  </div>
  )
}

export default ProfilePage