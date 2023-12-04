import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [[], navigate]);
  const [formData, setFormData] = useState({
    userTitle: '',
    userFirstName: '',
    userLastName: '',
    userGender: '',
    userEmail: '',
    userPassword: '',
    userDateOfBirth: '',
    userPhone: '',
    userPicture: '',
    userLocationId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would send a request to your API endpoint to create a new user
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users', formData);
      console.log(response.data);
      // Handle success (e.g., redirect to login page or display a success message)
    } catch (error) {
      console.error('Signup error', error.response.data);
      // Handle errors (e.g., display error messages)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUserTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Mr/Ms/Dr" name="userTitle" value={formData.userTitle} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter first name" name="userFirstName" value={formData.userFirstName} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter last name" name="userLastName" value={formData.userLastName} onChange={handleChange} />
      </Form.Group>

      {/* Add additional form fields for userGender, userEmail, etc. here */}
      
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" name="userEmail" value={formData.userEmail} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" name="userPassword" value={formData.userPassword} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control type="date" name="userDateOfBirth" value={formData.userDateOfBirth} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

export default SignUpPage;
