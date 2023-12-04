import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import CommentForm from './CommentForm';

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

const PostsList = () => {
  const { data, loading, error } = useQuery(GET_POSTS_QUERY);
  
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts!</p>;

  return (
    <List>
      {data.posts.map((post) => (
        <ListItem key={post.id}>
          <ListItemText
            primary={post.text}
            secondary={
              <>
                <Typography component="span" variant="body2" color="textPrimary">
                  {`Posted by: ${post.owner.firstName} ${post.owner.lastName}`}
                </Typography>
                <CommentForm postId={post.id} ownerId="5c158966-e06d-442f-a13f-49e304a0df02" />
                {post.comments.map((comment) => (
                  <Typography key={comment.id} component="p" variant="body2">
                    {`${comment.owner.firstName} ${comment.owner.lastName}: ${comment.message}`}
                  </Typography>
                ))}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PostsList;
