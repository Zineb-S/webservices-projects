import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 
function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/v1/posts')
      .then(response => {
        setPosts(response.data.content); // Assuming your API structure has a 'content' field
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      <h1>Posts</h1>
      <div className="d-flex flex-wrap">
      {posts.map(post => (
  <Card key={post.postId} style={{ width: '18rem', margin: '1rem' }}>
            {post.postImage && <Card.Img variant="top" src={post.postImage} />}
            <Card.Body>
              <Card.Title>{post.postText}</Card.Title>
              <Card.Text>Likes: {post.postLikes}</Card.Text>
              {post.postTags && <Card.Text>Tags: {post.postTags.join(', ')}</Card.Text>}
              <footer className="blockquote-footer">
                Published on: {formatDate(post.postPublishDate)}
              </footer>
              {post.postLink && (
                <Button variant="primary" as={Link} to={`/posts/${post.postId}`}>
                  Read more
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
