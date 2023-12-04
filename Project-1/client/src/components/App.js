import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import PostsPage from './PostsPage';
import UsersPage from './UsersPage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPosts from './UserPosts';
import PostDetail from './PostDetail';
import ProtectedRoute from '../ProtectedRoute';
import UserProfile from './UserProfile';

function App() {
  return (
    
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={PostsPage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/posts" element={<ProtectedRoute element={PostsPage} />} />
        <Route path="/posts/:postId" element={<ProtectedRoute element={PostDetail} />} />
        <Route path="/user-posts" element={<ProtectedRoute element={UserPosts} />} />
        <Route path="/users" element={<ProtectedRoute element={UsersPage} />} />
        <Route path="/profile" element={<ProtectedRoute element={ProfilePage} />} />
        <Route path="/users/:userId" element={<ProtectedRoute element={UserProfile} />} />
      </Routes>
    </Router>
  );
}

export default App;
