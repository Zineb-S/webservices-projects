import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import EditPostModal from './EditPostModal';

const UserPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const [showEditModal, setShowEditModal] = useState(false);
const [currentPost, setCurrentPost] = useState(null);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/v1/posts/user/${userId}`)
      .then(response => {
        setPosts(response.data.content);
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
  

  


const startEditing = (post) => {
  setCurrentPost(post);
  setShowEditModal(true);
};
const refreshPosts = () => {
  axios.get(`http://localhost:8080/api/v1/posts/user/${userId}`)
    .then(response => {
      setPosts(response.data.content);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
};
const handleDeletePost = (postId) => {
  axios.delete(`http://localhost:8080/api/v1/posts/${postId}`)
    .then(() => {
      refreshPosts();
    })
    .catch(error => {
      console.error('Error deleting post:', error);
      // Handle the error appropriately
    });
};
const handleEditPost = (updatedPost) => {
  axios.put(`http://localhost:8080/api/v1/posts/${updatedPost.postId}`, updatedPost)
    .then(response => {
      refreshPosts();
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });
};
  return (
    <div>
      <h1>My Posts</h1>
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
      <Button variant="primary" as={Link} to={`/posts/${post.postId}`}>
        Read more
      </Button>
      <Button variant="danger" onClick={() => handleDeletePost(post.postId)}>Delete</Button>
      <Button variant="secondary" onClick={() => startEditing(post)}>Edit</Button>
      <EditPostModal
      show={showEditModal}
      handleClose={() => setShowEditModal(false)}
      post={currentPost}
      handleEdit={handleEditPost}
    />
    </Card.Body>
  </Card>
        ))}
      </div>
    </div>
  )
}

export default UserPosts