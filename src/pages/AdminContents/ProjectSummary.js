import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';

const ProjectSummary = () => {
  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">Project Summary</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2">[ Add table or summary of projects here ]</Typography>
    </Paper>
  );
};

export default ProjectSummary;
