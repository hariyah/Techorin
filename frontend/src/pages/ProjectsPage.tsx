import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const ProjectsPage: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]); // TODO: Fetch projects from API

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setProjects([
        { id: '1', title: 'Project Alpha', description: 'Description for Alpha', status: 'pending' },
        { id: '2', title: 'Project Beta', description: 'Description for Beta', status: 'in-progress' },
      ]);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Projects
      </Typography>
      {projects.length === 0 ? (
        <Typography variant="body1">No projects found.</Typography>
      ) : (
        projects.map((project: any) => (
          <Box key={project.id} sx={{ mb: 2, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
            <Typography variant="h6">{project.title}</Typography>
            <Typography variant="body2">{project.description}</Typography>
            <Typography variant="caption">Status: {project.status}</Typography>
          </Box>
        ))
      )}
      <Box sx={{ mt: 3 }}>
        <Button component={Link} to="/" variant="outlined">
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectsPage;
