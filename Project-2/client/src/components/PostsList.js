import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, ListItem, ListItemText, Typography, Card, CardContent, makeStyles } from '@material-ui/core';
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
  },
  comment: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    borderLeft: '2px solid #ccc', // Example styling, adjust as needed
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
     <CreatePostForm />
      <h3>Posts List:</h3>
      <List>
        {data.posts.map((post) => (
          <Card key={post.id} className={classes.card} onClick={() => details(post.id)}>
            <CardContent>
              <Typography variant="h5" component="h2">{post.text}</Typography>
              <Typography variant="body2" color="textSecondary">
                Posted by: {`${post.owner.firstName} ${post.owner.lastName}`}
              </Typography>
              <Typography variant="body2" component="h2">
        At: {format(new Date(parseInt(post.publishDate)), 'yyyy-MM-dd HH:mm:ss')}
      </Typography>
              <Typography variant="h6" component="h2">Likes : {`${post.likes}`}</Typography>
            
              <Typography variant="h6" component="h2">Comments</Typography>

              {post.comments.map((comment) => (
                <Typography key={comment.id} variant="body2" component="div" className={classes.comment}>
                  {`${comment.owner.firstName} ${comment.owner.lastName}: ${comment.message}`}
                </Typography>
              ))}


            
            </CardContent>
          </Card>
        ))}

      </List>

    </>
  );
};
export default PostsList;
