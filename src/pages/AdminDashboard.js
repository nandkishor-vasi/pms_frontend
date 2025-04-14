import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../pages/AdminContents/Sidebar";
import Metrics from "../pages/AdminContents/Metrics";
import ProjectSummary from "../pages/AdminContents/ProjectSummary";
import ActivityFeed from "../pages/AdminContents/ActivityFeed";
import UserInfoCard from "../pages/AdminContents/UserInfoCard";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  CircularProgress
} from "@mui/material";

const drawerWidth = 240;

const AdminDashboard = () => {
  const { adminId } = useParams();
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const token = userData?.token;
  
  const backendBaseUrl = "http://localhost:8080";

  const [admin, setAdmin] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);

  useEffect(() => {
    if (!token || !adminId) return;

    const fetchAdmin = axios.get(`${backendBaseUrl}/api/admin/${adminId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([fetchAdmin])
      .then(([adminRes]) => {
        setAdmin(adminRes.data);
      })
      .catch((err) => console.error("Dashboard data load error:", err));
  }, [adminId, token]);

  if (!admin) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar adminId={adminId} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <UserInfoCard user={admin.user} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Metrics metrics={metrics} />
            <ProjectSummary />
          </Grid>

          {/* <Grid item xs={12} md={3}>
            <ActivityFeed activityFeed={activityFeed} />
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
