import React, { useState } from 'react';
import { useQuery, gql, useMutation, } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, List, ListItem, Divider, Avatar, Grid, Paper, makeStyles } from '@material-ui/core';

import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, } from '@material-ui/core';
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

const GET_USER_DETAILS = gql`
query GetUserDetailsById($id: ID!) {
    user(id: $id) {
      id
      title
      firstName
      lastName
      gender
      email
      dateOfBirth
      registerDate
      phone
      picture
      location {
        street
        city
        state
        country
        timezone
      }
      posts {
        id
        text
        image
        likes
        link
        publishDate
        tags {
          name
        }
        comments {
          id
          message
          publishDate
          owner {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
  
`;

const EDIT_USER_MUTATION = gql`
  mutation EditUser($id: ID!, $firstName: String, $lastName: String, $email: String!, $phone: String, $gender: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, gender: $gender) {
      id
      firstName
      lastName
      email
      phone
      gender
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
const EditUserForm = ({ user, open, onClose }) => {
    // useState hooks for all form fields
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [gender, setGender] = useState(user.gender);
    // ... other fields
  
    const [editUser] = useMutation(EDIT_USER_MUTATION, {
      refetchQueries: [{ query: GET_USER_DETAILS, variables: { id: user.id } }],
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      editUser({ variables: { id: user.id, firstName, lastName, email, phone, gender  } });
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
            <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            {/* Add TextFields for other fields */}
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
const useStyles = makeStyles((theme) => ({
    profileContainer: {
        marginBottom: theme.spacing(4),
        padding: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    postCard: {
        marginBottom: theme.spacing(2),
    },
    postImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
    },
    commentItem: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(1, 0),
    },
    userDetailsContainer: {
      padding: theme.spacing(3),
      margin: theme.spacing(3, 0),
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
  },
  userDetailsHeader: {
      marginBottom: theme.spacing(2),
  },
  profileInfo: {
      marginLeft: theme.spacing(2),
  },
  userActions: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
  },
  postSection: {
      marginTop: theme.spacing(4),
  },
  commentList: {
      marginTop: theme.spacing(2),
  },
  commentText: {
      paddingLeft: theme.spacing(2),
  },
}));

const UserDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_USER_DETAILS, { variables: { id } });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        refetchQueries: [{ query: GET_USERS_QUERY }],
    });

    const navigate = useNavigate();

    const handleDelete = (userId) => {
        deleteUser({ variables: { id: userId } });
        navigate(`/users`)
    };

    const handleOpenEditDialog = (user) => {
        setSelectedUser(user);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedUser(null);
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { user } = data;
    return (
      <div>
          <Paper className={classes.userDetailsContainer}>
              <Grid container spacing={3} alignItems="center">
                  <Grid item>
                      <Avatar src={user.picture} alt={`${user.firstName} ${user.lastName}`} className={classes.avatar} />
                  </Grid>
                  <Grid item xs>
                      <div className={classes.profileInfo}>
                          <Typography variant="h4" className={classes.userDetailsHeader}>{user.firstName} {user.lastName}</Typography>
                          <Typography variant="body1">Email: {user.email}</Typography>
                          <Typography variant="body1">Phone: {user.phone}</Typography>
                          <Typography variant="body1">Gender: {user.gender}</Typography>
                          <Typography variant="body1">Registered: {new Date(parseInt(user.registerDate)).toLocaleDateString()}</Typography>
                          {user.location && (
                              <div>
                                  <Typography variant="body1">Street: {user.location.street}</Typography>
                                  <Typography variant="body1">City: {user.location.city}</Typography>
                                  <Typography variant="body1">State: {user.location.state}</Typography>
                                  <Typography variant="body1">Country: {user.location.country}</Typography>
                                  <Typography variant="body1">Timezone: {user.location.timezone}</Typography>
                              </div>
                          )}
                      </div>
                      <div className={classes.userActions}>
                          <Button onClick={() => handleOpenEditDialog(user)} variant="contained" color="primary">
                              Edit
                          </Button>
                          <Button onClick={() => handleDelete(user.id)} variant="contained" color="secondary">
                              Delete
                          </Button>
                      </div>
                  </Grid>
              </Grid>
          </Paper>
  
          <Typography variant="h5" className={classes.postSection}>Posts:</Typography>
          {user.posts.map(post => (
              <Card key={post.id} className={classes.postCard}>
                  {post.image && (
                      <CardMedia
                          component="img"
                          image={post.image}
                          alt="Post"
                          className={classes.postImage}
                      />
                  )}
                  <CardContent>
                      <Typography variant="h6">{post.text}</Typography>
                      <Typography variant="subtitle2">Published: {new Date(parseInt(post.publishDate)).toLocaleDateString()}</Typography>
                      <Divider />
                      <List className={classes.commentList}>
                          <Typography>Comments</Typography>
                          {post.comments.map(comment => (
                              <ListItem key={comment.id} className={classes.commentItem}>
                                  <Typography variant="body2" className={classes.commentText}>
                                      {comment.owner.firstName}: {comment.message}
                                  </Typography>
                              </ListItem>
                          ))}
                      </List>
                  </CardContent>
              </Card>
          ))}
          {selectedUser && (
              <EditUserForm user={selectedUser} open={openEditDialog} onClose={handleCloseEditDialog} />
          )}
      </div>
  );
          }  

export default UserDetails;
