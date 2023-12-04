import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core';
import CommentForm from './CommentForm';
const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    postById(id: $id) {
      id
      text
      image
      link
      publishDate
      owner {
        id
        firstName
        lastName
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
      tags {
        name
      }
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $text: String!, $image: String, $link: String, $tags: [String]) {
    updatePost(id: $id, text: $text, image: $image, link: $link, tags: $tags) {
      id
      
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
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
const useStyles = makeStyles((theme) => ({
    formField: {
      margin: theme.spacing(1, 0),
    },
    imagePreview: {
      maxWidth: '100%',
      maxHeight: 400,
      display: 'block',
      margin: 'auto',
    },
    tagField: {
      margin: theme.spacing(2, 0, 1),
    },
    detailText: {
      margin: theme.spacing(1, 0),
    },
    // Add more styles as needed
  }));
const PostDetail = () => {
    const classes = useStyles();
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_POST_BY_ID, { variables: { id } });
    
    const [isEditing, setIsEditing] = useState(false);
    const [postDetails, setPostDetails] = useState({ text: '', image: '', link: '', tags: [] });
    const [updatePost] = useMutation(UPDATE_POST, {
        onCompleted: () => {
          setIsEditing(false);
        },
        refetchQueries: [
          { query: GET_POSTS_QUERY } // Replace with your query to fetch the list of posts
        ],
      });
      
      const [deletePost] = useMutation(DELETE_POST, {
        onCompleted: () => {
          navigate('/posts'); // Redirect after deletion
        },
        refetchQueries: [
          { query: GET_POSTS_QUERY } // Again, replace with your posts list query
        ],
      });
      
  
    useEffect(() => {
      if (data && data.postById) {
        setPostDetails({
          text: data.postById.text,
          image: data.postById.image,
          link: data.postById.link,
          tags: data.postById.tags.map(tag => tag.name).join(', ')
        });
      }
    }, [data]);
  
    const handleEdit = () => setIsEditing(!isEditing);
  
    const handleChange = (field) => (event) => {
      setPostDetails({ ...postDetails, [field]: event.target.value });
    };
  
    const handleUpdate = async () => {
        await updatePost({
          variables: {
            id,
            text: postDetails.text,
            image: postDetails.image,
            link: postDetails.link,
            tags: postDetails.tags.split(',').map(tag => tag.trim())
          }
        });
      };
      const handleDelete = async () => {
        await deletePost({ variables: { id } });
      };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading post</p>;
  
    return (
        <Dialog open={true} onClose={() => navigate('/posts')} fullWidth maxWidth="md">
          <DialogTitle>Post Detail</DialogTitle>
          <DialogContent>
            {isEditing ? (
              <>
                <TextField
                  className={classes.formField}
                  label="Text"
                  value={postDetails.text}
                  onChange={handleChange('text')}
                  multiline
                  fullWidth
                />
                <TextField
                  className={classes.formField}
                  label="Image URL"
                  value={postDetails.image}
                  onChange={handleChange('image')}
                  fullWidth
                />
                <TextField
                  className={classes.formField}
                  label="Link"
                  value={postDetails.link}
                  onChange={handleChange('link')}
                  fullWidth
                />
                <TextField
                  className={classes.tagField}
                  label="Tags (comma-separated)"
                  value={postDetails.tags}
                  onChange={handleChange('tags')}
                  fullWidth
                />
              </>
            ) : (
              <>
                <Typography variant="body1" className={classes.detailText}>{postDetails.text}</Typography>
                {postDetails.image && <img src={postDetails.image} alt="Post" className={classes.imagePreview} />}
                {postDetails.link && <Typography variant="body2" className={classes.detailText}>Link: {postDetails.link}</Typography>}
                <Typography variant="body2" className={classes.detailText}>Tags: {postDetails.tags}</Typography>
                <CommentForm postId={id} ownerId="5c158966-e06d-442f-a13f-49e304a0df02" />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</Button>
            {isEditing && <Button color="primary" variant="contained" onClick={handleUpdate}>Save</Button>}
            <Button color="secondary" variant="contained" onClick={handleDelete}>Delete</Button>
            <Button onClick={() => navigate('/posts')}>Close</Button>
          </DialogActions>
        </Dialog>
      );
    };
  
  export default PostDetail;