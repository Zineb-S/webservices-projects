import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function PostDetail() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [commentMessage, setCommentMessage] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in local storage
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    // Get the current date in the desired format
  const currentDate = new Date().toISOString(); // or format it as needed

  const newComment = {
    commentMessage,
    commentOwnerId: userId,
    commentPostId: postId,
    commentPublishDate: currentDate, // Include the current date
  };

    axios.post('http://localhost:8080/api/v1/comments', newComment)
      .then(response => {
        setComments([...comments, { ...response.data, user: { userId } }]); // Update the comments state
        setCommentMessage(''); // Clear the input field
      })
      .catch(error => console.error('Error creating comment:', error));
  };
  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/posts/${postId}`)
    .then(response => {
      setPost(response.data);
    })
    .catch(error => console.error('Error fetching post:', error));
    
    axios.get(`http://localhost:8080/api/v1/comments/post/${postId}`)
    .then(async (response) => {
      const commentsWithUser = await Promise.all(response.data.content.map(async (comment) => {
        const userResponse = await axios.get(`http://localhost:8080/api/v1/users/${comment.commentOwnerId}`);
        return { ...comment, user: userResponse.data };
      }));
      setComments(commentsWithUser);
    })
    .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);
  
  if (!post) return <div>Loading...</div>;
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:8080/api/v1/comments/${commentId}`)
      .then(() => {
        // Update the comments state to remove the deleted comment
        setComments(comments.filter(comment => comment.commentId !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };
  
  return (
    <div >
    <Card>
    {post.postImage && <Card.Img variant="top" src={post.postImage} width={350} height={350} />}
    <Card.Body>
    <Card.Title>{post.postText}</Card.Title>
    <Card.Text>Likes: {post.postLikes}</Card.Text>
    {/* ... other post details */}
    </Card.Body>
    </Card>
    <h2>Comments</h2>
   
    {comments.map(comment => (
      <div key={comment.commentId}>
      <p>
      <strong>{comment.user.userFirstName} {comment.user.userLastName} <Link to={`/users/${comment.user.userId}`}>View Profile</Link>
      </strong>
      <span style={{marginLeft: '10px'}}><i className="fas fa-user-circle"></i></span> {/* User icon */}
      <br/>
      {comment.commentMessage}
      <br/>
      <small>Published on: {formatDate(comment.commentPublishDate)}</small>
      </p>
      {comment.commentOwnerId === localStorage.getItem('userId') && (
      <Button variant="danger" onClick={() => handleDeleteComment(comment.commentId)}>
        Delete
      </Button>
    )}
      </div>
      ))}
       <Form onSubmit={handleCommentSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Add a Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Comment
        </Button>
      </Form>
      </div>
      );
    }
    
    export default PostDetail;
    