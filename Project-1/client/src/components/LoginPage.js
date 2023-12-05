import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/');
    }
  }, [[], navigate]);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', { userEmail, userPassword });
      console.log(response); // Log the response to check its structure
      localStorage.setItem('userId', response.data.userId);
      navigate('/');
    } catch (error) {
      setLoginError('Invalid email or password');
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
        </div>

        {loginError && <p className="error-message">{loginError}</p>}

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
