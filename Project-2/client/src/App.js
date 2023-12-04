import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { TextField, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PostsList from './PostsList';
import CreatePostForm from './CreatePostForm';

const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;
const EDIT_USER_MUTATION = gql`
  mutation EditUser($id: ID!, $firstName: String, $lastName: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      
    }
  }
`;
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const CreateUserForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: GET_USERS_QUERY }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({ variables: { firstName, lastName, email } });
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" disabled={loading}>Create User</Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
    </div>
  );
};
const EditUserForm = ({ user, open, onClose }) => {
  // useState hooks for form fields
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const [editUser] = useMutation(EDIT_USER_MUTATION, {
    refetchQueries: [{ query: GET_USERS_QUERY }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user.id, firstName, lastName, email)
    editUser({ variables: { id: user.id, firstName, lastName, email } });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const UsersList = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [{ query: GET_USERS_QUERY }],
  });

  const { data, loading, error } = useQuery(GET_USERS_QUERY);

  const handleDelete = (userId) => {
    deleteUser({ variables: { id: userId } });
  };

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users!</p>;

  return (
    <List>
      {data.users.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
          <Button onClick={() => handleOpenEditDialog(user)}>Edit</Button>
          <Button onClick={() => handleDelete(user.id)}>Delete</Button>
        </ListItem>
      ))}
      {selectedUser && (
        <EditUserForm user={selectedUser} open={openEditDialog} onClose={handleCloseEditDialog} />
      )}
    </List>
  );
};
const App = () => {
  return (
    <div>
      <h1>Create User</h1>
      <CreateUserForm />
      <h2>Users List</h2>
      <UsersList />
      <h1>Create Post</h1>
<CreatePostForm ownerId="5c158966-e06d-442f-a13f-49e304a0df02" />

<h2>Posts List</h2>
<PostsList />
    </div>
  );
};

export default App;
