import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom'; // <-- Import Link
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import AssessmentIcon from '@mui/icons-material/Assessment';


const drawerWidth = 240;
const Sidebar = ( {adminId}) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to={`/adminDashboard/${adminId}`}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button component={Link} to={`/admin/${adminId}/projects`}>
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>

          <ListItem button component={Link} to={`/admin/${adminId}/reports`}>
            <ListItemIcon><AssessmentIcon /></ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>

          <ListItem button component={Link} to={`/admin/${adminId}/activity`}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Activity" />
          </ListItem>
          
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
