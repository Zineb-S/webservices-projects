import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/users')
      .then(response => {
        // The users are in the 'content' property of the response data
        if (response.data && Array.isArray(response.data.content)) {
          setUsers(response.data.content);
          console.log(response)
        } else {
          // If the 'content' property is not an array, log an error or handle accordingly
          console.error('Data content is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:8080/api/v1/users/${userId}`)
      .then(() => {
        // Update users list or re-fetch users
      })
      .catch(error => console.error('Error deleting user:', error));
  };
  // Now 'users' is an array if the response was in the expected format
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
  <li key={user.userId}>
    {user.userTitle} {user.userFirstName} {user.userLastName}  
    {/* Update button here */}
    <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer',marginLeft:'50px',marginBottom:'30px' }} onClick={() => handleDeleteUser(user.userId) }>Delete</button>
  </li>
))}
      
    
    </div>
  );
}

export default UserList;
