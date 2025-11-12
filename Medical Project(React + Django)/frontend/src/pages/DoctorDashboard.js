import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../api/axios';

const DoctorDashboard = () => {
  const [tab, setTab] = useState(0);
  const [availabilities, setAvailabilities] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAvailability, setNewAvailability] = useState({
    day_of_week: 'monday',
    start_time: '',
    end_time: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    try {
      if (tab === 0) {
        const res = await api.get('/doctors/me/');
        setProfile(res.data);
      } else if (tab === 1) {
        const res = await api.get('/availabilities/');
        setAvailabilities(Array.isArray(res.data) ? res.data : res.data.results || []);
      } else if (tab === 2) {
        const res = await api.get('/appointments/');
        setAppointments(Array.isArray(res.data) ? res.data : res.data.results || []);
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to load data', severity: 'error' });
    }
  };

  const handleAddAvailability = async () => {
    try {
      await api.post('/availabilities/', newAvailability);
      setNewAvailability({ day_of_week: 'monday', start_time: '', end_time: '' });
      setOpenDialog(false);
      loadData();
      setSnackbar({ open: true, message: 'Availability added', severity: 'success' });
    } catch (error) {
      const msg = error.response?.data ? JSON.stringify(error.response.data) : 'Error adding availability';
      setSnackbar({ open: true, message: msg, severity: 'error' });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await api.patch(`/doctors/${profile.id}/`, profile);
      loadData();
      setSnackbar({ open: true, message: 'Profile updated', severity: 'success' });
    } catch (error) {
      const msg = error.response?.data ? JSON.stringify(error.response.data) : 'Error updating profile';
      setSnackbar({ open: true, message: msg, severity: 'error' });
    }
  };

  const handleApprove = async (aptId) => {
    try {
      await api.post(`/appointments/${aptId}/approve/`);
      loadData();
      setSnackbar({ open: true, message: 'Appointment approved', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error approving appointment', severity: 'error' });
    }
  };

  const handleReject = async (aptId) => {
    try {
      await api.post(`/appointments/${aptId}/reject/`);
      loadData();
      setSnackbar({ open: true, message: 'Appointment rejected', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error rejecting appointment', severity: 'error' });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Profile" />
        <Tab label="Availability" />
        <Tab label="Appointments" />
      </Tabs>

      {tab === 0 && profile && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={4}
            margin="normal"
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
          <TextField
            fullWidth
            label="Phone"
            margin="normal"
            value={profile.phone || ''}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            value={profile.address || ''}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          />
          <Button variant="contained" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </Paper>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
            Add Availability
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availabilities.map((avail) => (
                  <TableRow key={avail.id}>
                    <TableCell>{avail.day_of_week}</TableCell>
                    <TableCell>{avail.start_time}</TableCell>
                    <TableCell>{avail.end_time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {tab === 2 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>{apt.patient?.user?.username}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>{apt.status}</TableCell>
                  <TableCell>
                    {apt.status === 'pending' && (
                      <>
                        <Button size="small" onClick={() => handleApprove(apt.id)}>
                          Approve
                        </Button>
                        <Button size="small" color="error" onClick={() => handleReject(apt.id)}>
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Availability</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Day"
            margin="normal"
            value={newAvailability.day_of_week}
            onChange={(e) => setNewAvailability({ ...newAvailability, day_of_week: e.target.value })}
          >
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
            <MenuItem value="friday">Friday</MenuItem>
            <MenuItem value="saturday">Saturday</MenuItem>
            <MenuItem value="sunday">Sunday</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Start Time"
            type="time"
            margin="normal"
            value={newAvailability.start_time}
            onChange={(e) => setNewAvailability({ ...newAvailability, start_time: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="End Time"
            type="time"
            margin="normal"
            value={newAvailability.end_time}
            onChange={(e) => setNewAvailability({ ...newAvailability, end_time: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAvailability} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DoctorDashboard;

