import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserEditModal from './UserEditModal'; // Assuming you have this component

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/v1/users')
      .then(response => {
        setUsers(response.data.content);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:8080/api/v1/users/${userId}`)
      .then(() => {
        fetchUsers(); // Refresh the user list after deletion
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEditUser = (user) => {
    console.log("Edit clicked for user:", user); // Debug log
    setEditingUser(user);
  };

  return (
    <div className="user-list-container">
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId} className="user-item">
            {user.userTitle} {user.userFirstName} {user.userLastName}
            <button onClick={() => handleEditUser(user)} className="edit-button">Edit</button>
            <button onClick={() => handleDeleteUser(user.userId)} className="delete-button">Delete</button>

          </li>
        ))}
      </ul>
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={fetchUsers}
        />
      )}
    </div>
  );
}

export default UserList;
