import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const UserInfoCard = ({ user }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            <AdminPanelSettingsIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Typography mt={2} variant="body2">
          Role: {user?.role || "Admin"} <br />
          Status: Active
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
