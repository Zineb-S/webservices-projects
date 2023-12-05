import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UserEditModal({ user, onClose, onSave }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/users/${user.userId}`, editedUser);
      onSave(); // Refresh the user list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Add form fields for editing user details */}
          {/* Repeat this structure for each user field */}
          <div className="mb-3">
            <label htmlFor="userTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="userTitle" name="userTitle" value={editedUser.userTitle} onChange={handleInputChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="userFirstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="userFirstName" name="userFirstName" value={editedUser.userFirstName} onChange={handleInputChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="userLastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="userLastName" name="userLastName" value={editedUser.userLastName} onChange={handleInputChange} />
          </div>

          {/* Add more input fields for other user properties such as userGender, userEmail, etc. */}
          
          {/* Example for userEmail */}
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="userEmail" name="userEmail" value={editedUser.userEmail} onChange={handleInputChange} />
          </div>

          {/* Add other fields as needed */}
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditModal;
