import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom'; // <-- Import Link
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
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
            <ListItemText primary="Reports" />
          </ListItem>

          <ListItem button component={Link} to={`/admin/${adminId}/profile`}>
            <ListItemIcon><AssessmentIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
