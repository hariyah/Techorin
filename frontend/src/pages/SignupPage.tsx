import React from 'react';
import { Box, Typography, TextField, Button, Container, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [gmail, setGmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('user'); // Default role

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Signup attempt:', { username, gmail, password, role });
    // TODO: Implement actual signup logic with Axios
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="gmail"
            label="Email Address"
            name="gmail"
            autoComplete="email"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="role"
            label="Role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="text">
              Already have an account? Sign In
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
