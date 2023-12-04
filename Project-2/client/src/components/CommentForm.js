import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, Typography, Paper, makeStyles } from '@material-ui/core';
const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($post: ID!, $message: String!, $owner: ID!) {
    createComment(post: $post, message: $message, owner: $owner) {
      id
      message
      owner {
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

// Custom styles
const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
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
    backgroundColor: '#3f51b5', // Example color, adjust as needed
    color: 'white',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  // Add more styles as needed
}));


const CommentForm = ({ postId, ownerId }) => {
  const classes = useStyles();

  const [message, setMessage] = useState('');
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: GET_POSTS_QUERY }],
    // Other options...
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    await createComment({ variables: { post: postId, message, owner: ownerId } });
    setMessage('');
  };

  return (
    <Paper className={classes.formContainer}>

      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          variant="outlined"
        />
        <Button type="submit" disabled={loading} className={classes.submitButton}>
          Add Comment
        </Button>
      </form>
      {loading && <p>Submitting...</p>}
      {error && <p>Error :( Please try again</p>}
    </Paper>
  );
};

export default CommentForm;