// src/pages/Dashboard.js

import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import PlaidLinkButton from '../components/PlaidLinkButton';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;
  console.log(user)

  if (!token) {
    window.location.href = '/login';
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome, {user ? user.name || user.id : 'User'} 👋
      </Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
      <PlaidLinkButton />
    </Container>
  );
};

export default Dashboard;
