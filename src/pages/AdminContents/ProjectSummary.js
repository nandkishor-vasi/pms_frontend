import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, TextField, Button, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Checkbox, ListItemText, Box, Grid, Container } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 

const ProjectSummary = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'NOT_STARTED',
    startDate: '',
    endDate: '',
    members: [],
  });
  const [membersList, setMembersList] = useState([]);
  const userData = useAuth();
  const token = userData?.user?.token;
  const userId = userData?.user?.id;
  const backendBaseUrl = "http://localhost:8080";
  console.log("userId", userId);

  useEffect(() => {
    // Fetching projects data
    axios.get(`${backendBaseUrl}/api/projects/projectByAdmin/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });

    // Fetching members list
    axios.get(`${backendBaseUrl}/api/admin/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setMembersList(res.data))
      .catch(err => console.error("Failed to fetch members:", err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMembersChange = (e) => {
    const value = e.target.value;
    setNewProject(prev => ({
      ...prev,
      members: value,
    }));
  };

  const handleCreateProject = () => {
    const payload = {
      ...newProject,
      createdBy: { id: userData?.user?.id },
      members: newProject.members.map(id => ({ id })) // wrapping member IDs as objects
    };
  
    console.log('Sending Payload:', payload);
  
    axios.post(`${backendBaseUrl}/api/projects`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setProjects(prev => [...prev, res.data]);
        setNewProject({
          title: '',
          description: '',
          status: 'NOT_STARTED',
          startDate: '',
          endDate: '',
          members: [],
        });
      })
      .catch(err => console.error("Failed to create project:", err));
  };
  
  
  

  return (
    <Container maxWidth="lg">
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Project Summary</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Create Project Form */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Create New Project</Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Title" 
                name="title" 
                value={newProject.title} 
                onChange={handleChange} 
                sx={{ mb: 2 }} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Description" 
                name="description" 
                value={newProject.description} 
                onChange={handleChange} 
                sx={{ mb: 2 }} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={newProject.status} onChange={handleChange}>
                  <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Start Date" 
                type="date" 
                name="startDate" 
                value={newProject.startDate} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
                sx={{ mb: 2 }} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="End Date" 
                type="date" 
                name="endDate" 
                value={newProject.endDate} 
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
                sx={{ mb: 2 }} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Members</InputLabel>
                <Select
                  multiple
                  value={newProject.members}
                  onChange={handleMembersChange}
                  input={<OutlinedInput label="Members" />}
                  renderValue={(selected) =>
                    selected.map(id => membersList.find(m => m.id === id)?.name || id).join(', ')
                  }
                >
                  {membersList.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      <Checkbox checked={newProject.members.includes(member.id)} />
                      <ListItemText primary={member.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleCreateProject} fullWidth>Create Project</Button>
          </Box>
        </Box>

        {loading ? (
          <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Members</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{project.createdBy?.name || 'Unknown'}</TableCell>
                  <TableCell>{project.members?.length || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default ProjectSummary;
