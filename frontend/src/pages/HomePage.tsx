import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Projects App
      </Typography>
      <Typography variant="body1" paragraph>
        Please login or sign up to continue.
      </Typography>
      <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>
        Login
      </Button>
      <Button component={Link} to="/signup" variant="outlined" color="primary">
        Sign Up
      </Button>
    </Box>
  );
};

export default HomePage;
