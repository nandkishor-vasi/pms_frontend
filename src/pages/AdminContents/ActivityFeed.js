import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ActivityFeed = ({ activityFeed }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6"><AccessTimeIcon fontSize="small" /> Activity Feed</Typography>
      <Divider sx={{ my: 1 }} />
      {activityFeed.map((item, idx) => (
        <Typography key={idx} variant="body2" sx={{ mb: 1 }}>• {item}</Typography>
      ))}
    </Paper>
  );
};

export default ActivityFeed;
