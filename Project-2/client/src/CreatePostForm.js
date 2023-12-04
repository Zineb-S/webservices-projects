import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';

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

const CreatePostForm = ({ ownerId }) => {
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
        refetchQueries: [{ query: GET_POSTS_QUERY }],
        // Other options...
      });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Convert tags string to an array
      const tagsArray = tags.split(',').map(tag => tag.trim());
      createPost({ variables: { text, ownerId, tags: tagsArray } });
      setText('');
      setTags('');
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" disabled={loading}>Create Post</Button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error :( Please try again</p>}
      </div>
    );
  };
  
  export default CreatePostForm;
  