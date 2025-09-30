import React from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [gmail, setGmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login attempt:', { gmail, password });
    // TODO: Implement actual login logic with Axios
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="gmail"
            label="Email Address"
            name="gmail"
            autoComplete="email"
            autoFocus
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="text">
              Don't have an account? Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
