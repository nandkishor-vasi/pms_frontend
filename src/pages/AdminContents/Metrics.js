import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Metrics = ({ metrics }) => {
  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">{metric.label}</Typography>
              <Typography variant="h4" color="primary">{metric.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Metrics;
