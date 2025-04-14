import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Divider } from '@mui/material';

const ActivitiesCountPerProject = () => {
  const [activitiesCount, setActivitiesCount] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/analytics/activities/count-per-project')
      .then(res => setActivitiesCount(res.data))
      .catch(err => console.error("Failed to fetch activity count per project:", err));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Activities Count Per Project</Typography>
      <Divider sx={{ my: 1 }} />
      {activitiesCount.length === 0 ? (
        <Typography variant="body2">No data available</Typography>
      ) : (
        activitiesCount.map((item, idx) => (
          <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
            • Project ID: {item.projectId}, Activities: {item.activityCount}
          </Typography>
        ))
      )}
    </Paper>
  );
};

export default ActivitiesCountPerProject;
