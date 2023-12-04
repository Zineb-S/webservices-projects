import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { TextField, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import UsersList from './UsersList';
import PostsList from './PostsList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostDetails from './PostDetails';
import UserDetails from './UserDetails';

/*<Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/posts" element={<ProtectedRoute element={PostsPage} />} />
        <Route path="/posts/:postId" element={<ProtectedRoute element={PostDetail} />} />
        <Route path="/user-posts" element={<ProtectedRoute element={UserPosts} />} />
        <Route path="/users" element={<ProtectedRoute element={UsersPage} />} />
        <Route path="/profile" element={<ProtectedRoute element={ProfilePage} />} />
        <Route path="/users/:userId" element={<ProtectedRoute element={UserProfile} />} />*/

const App = () => {
  return (
    <Router>

      <NavBar />
      <Routes>

      <Route path="/" element={<UsersList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/post-details/:id" element={<PostDetails />} />

      </Routes>


    </Router>
  );
};

export default App;
