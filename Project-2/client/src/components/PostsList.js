import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, ListItem, Typography, Card, CardContent, CardActions, Button, makeStyles } from '@material-ui/core';
import CommentForm from './CommentForm';
import CreatePostForm from './CreatePostForm';
import PostDetail from './PostDetails';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
const GET_POSTS_QUERY = gql`
query GetPosts {
  posts {
    id
    text
    likes
    publishDate
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
  card: {
    marginBottom: theme.spacing(2),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Added subtle shadow
    '&:hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Shadow effect on hover
    },
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  comment: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    borderLeft: '2px solid #ccc',
    fontStyle: 'italic', // Example styling, adjust as needed
  },
  postText: {
    fontWeight: 'bold',
  },
  detailsButton: {
    justifyContent: 'flex-end',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  // Add more styles as needed
}));
const PostsList = () => {
  const navigate = useNavigate();
  const details = (id) => {
    navigate(`/post-details/${id}`)
  }
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_POSTS_QUERY);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts!</p>;
  
  return (
    <>
     
    
      <List>
        {data.posts.map((post) => (
          <Card key={post.id} className={classes.card}>
            <CardContent>
              <div className={classes.postHeader}>
                <Typography variant="h5" component="h2" className={classes.postText}>{post.text}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {format(new Date(parseInt(post.publishDate)), 'yyyy-MM-dd HH:mm:ss')}
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary">
                Posted by: {`${post.owner.firstName} ${post.owner.lastName}`}
              </Typography>
              <Typography variant="body2" component="div">
                Likes: {post.likes}
              </Typography>
              <Typography variant="body2" component="div" className={classes.comment}>
                Comments:
                {post.comments.map((comment) => (
                  <Typography key={comment.id} variant="caption" display="block">
                    {`${comment.owner.firstName} ${comment.owner.lastName}: ${comment.message}`}
                  </Typography>
                ))}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary" onClick={() => details(post.id)}>
                View Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>
      <CreatePostForm />
    </>
  );
};

export default PostsList;
