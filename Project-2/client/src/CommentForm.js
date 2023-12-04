import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';
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


const CommentForm = ({ postId, ownerId }) => {
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
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            variant="outlined"
          />
          <Button type="submit" disabled={loading}>Add Comment</Button>
        </form>
        {loading && <p>Submitting...</p>}
        {error && <p>Error :( Please try again</p>}
      </div>
    );
  };
  
  export default CommentForm;