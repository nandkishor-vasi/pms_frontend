import React from 'react';
import ActivitiesCountPerProject from './ActivitiesCountPerProject';
import ActivityCountByHandler from './ActivityCountByHandler';
import ActivityFeed from './ActivityFeed'; // Assuming this component is already set up
import ActivityTimelineForProject from './ActivityTimelineForProject';

const AnalyticsPage = () => {
  const projectId = 1; 
  
  return (
    <div>
      <ActivitiesCountPerProject />
      <ActivityCountByHandler />
      <ActivityFeed limit={5} />
      <ActivityTimelineForProject projectId={projectId} />
    </div>
  );
};

export default AnalyticsPage;
