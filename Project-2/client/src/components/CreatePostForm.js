import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core';
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($text: String!, $ownerId: ID!, $tags: [String!]) {
    createPost(data: { text: $text, ownerId: $ownerId, tags: $tags }) {
      id
      text
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;
const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      id
      text
      owner {
        firstName
        lastName
      }
      comments {
        id
        message
        owner {
          firstName
          lastName
        }
      }
    }
  }
`;
const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(3),
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: 500,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%', // Makes input fields take up full width of container
    },
  },
  submitButton: {
    backgroundColor: '#4caf50', // Example color, choose as per your theme
    color: 'white',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
  // Add more styles as needed
}));
const CreatePostForm = () => {
  const classes = useStyles();
  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS_QUERY);
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: GET_POSTS_QUERY }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const tagsArray = tags.split(',').map(tag => tag.trim());
    createPost({ variables: { text, ownerId, tags: tagsArray } });
    setText('');
    setTags('');
    setOwnerId('');
  };

  return (
    <Paper className={classes.formContainer}>
      <Typography variant="h5" gutterBottom>Create a New Post</Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Post Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField
          label="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          variant="outlined"
        />
        <FormControl variant="outlined" className={classes.formField}>
          <InputLabel id="owner-select-label">Owner</InputLabel>
          <Select
            labelId="owner-select-label"
            id="owner-select"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            label="Owner"
          >
            {usersLoading ? <MenuItem value="">Loading...</MenuItem> :
              usersData.users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button type="submit" disabled={loading || !ownerId} className={classes.submitButton}>
          Create Post
        </Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
    </Paper>
  );
};

export default CreatePostForm;
