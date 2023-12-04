import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditPostModal = ({ show, handleClose, post, handleEdit }) => {
  const [editedPost, setEditedPost] = useState({ ...post });

  useEffect(() => {
    setEditedPost({ ...post });
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(editedPost);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedPost.postText}
              onChange={(e) => setEditedPost({ ...editedPost, postText: e.target.value })}
              required
            />
          </Form.Group>
          {/* Add other fields here as needed */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostModal;
