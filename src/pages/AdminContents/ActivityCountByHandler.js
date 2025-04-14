import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Divider } from '@mui/material';

const ActivityCountByHandler = () => {
  const [handlerCounts, setHandlerCounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/analytics/activities/count-by-handler')
      .then(res => setHandlerCounts(res.data))
      .catch(err => console.error("Failed to fetch activity count by handler:", err));
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Activity Count by Handler</Typography>
      <Divider sx={{ my: 1 }} />
      {handlerCounts.length === 0 ? (
        <Typography variant="body2">No data available</Typography>
      ) : (
        handlerCounts.map((item, idx) => (
          <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
            • Handler ID: {item.handlerId}, Activity Count: {item.activityCount}
          </Typography>
        ))
      )}
    </Paper>
  );
};

export default ActivityCountByHandler;
