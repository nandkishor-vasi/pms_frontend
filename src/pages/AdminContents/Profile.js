import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';

const Profile = () => {
  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">Profile Summary</Typography>
      <Divider sx={{ my: 1 }} />
    </Paper>
  );
};

export default Profile;
