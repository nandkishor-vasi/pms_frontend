import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Divider } from '@mui/material';

const ActivityTimelineForProject = ({ projectId }) => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    if (projectId) {
      axios.get(`http://localhost:8080/api/analytics/projects/${projectId}/timeline`)
        .then(res => setTimeline(res.data))
        .catch(err => console.error("Failed to fetch activity timeline:", err));
    }
  }, [projectId]);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Activity Timeline for Project {projectId}</Typography>
      <Divider sx={{ my: 1 }} />
      {timeline.length === 0 ? (
        <Typography variant="body2">No timeline data available</Typography>
      ) : (
        timeline.map((item, idx) => (
          <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
            • {item.activityDate}: {item.activityDescription}
          </Typography>
        ))
      )}
    </Paper>
  );
};

export default ActivityTimelineForProject;
