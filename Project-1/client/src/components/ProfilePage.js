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
const profileImageStyle = {
  width: '150px', // Set the width to the desired size
  height: '150px', // Set the height to the desired size
  objectFit: 'cover', // This makes sure the image keeps its aspect ratio
  borderRadius: '50%', // Optional: makes the image circular
};

if (loading) return <div className="loading">Loading...</div>;
if (error) return <div className="error">{error}</div>;

return (
  <div className="profile-container">
    <h1>User Profile</h1>
    {user && (
      <div className="user-info">
        <img src={user.userPicture} alt="Profile" className="profile-image" />
        <div className="user-details">
          <h2>{user.userFirstName} {user.userLastName}</h2>
          <p>Title: {user.userTitle}</p>
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