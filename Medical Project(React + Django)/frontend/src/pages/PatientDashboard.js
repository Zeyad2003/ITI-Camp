import React, { useState, useEffect, useCallback } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../api/axios';

const PatientDashboard = () => {
  const [tab, setTab] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ date: '', time: '' });
  const [filter, setFilter] = useState({ specialty: '', name: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const padTime = (value) => value.toString().padStart(2, '0');
  const currentTime = `${padTime(now.getHours())}:${padTime(now.getMinutes())}`;
  const minTime = bookingData.date === minDate ? currentTime : '00:00';

  const getErrorMessage = (error, fallback) => {
    const data = error?.response?.data;
    if (!data) return fallback;
    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    if (data.message) return data.message;
    const parts = [];
    Object.values(data).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === 'string') parts.push(item);
          else if (item && typeof item === 'object') parts.push(JSON.stringify(item));
        });
      } else if (typeof value === 'string') {
        parts.push(value);
      }
    });
    return parts.length ? parts.join(' ') : fallback;
  };

  const loadData = useCallback(async () => {
    try {
      if (tab === 0) {
        const res = await api.get('/doctors/');
        let doctorsList = Array.isArray(res.data) ? res.data : res.data.results || [];
        if (filter.specialty) {
          doctorsList = doctorsList.filter(d => d.specialty?.name === filter.specialty);
        }
        if (filter.name) {
          doctorsList = doctorsList.filter(d => 
            d.user?.username?.toLowerCase().includes(filter.name.toLowerCase()) ||
            d.user?.first_name?.toLowerCase().includes(filter.name.toLowerCase())
          );
        }
        setDoctors(doctorsList);
      } else if (tab === 1) {
        const res = await api.get('/patients/me/');
        setProfile(res.data);
      } else if (tab === 2) {
        const res = await api.get('/appointments/');
        setAppointments(Array.isArray(res.data) ? res.data : res.data.results || []);
      }
    } catch (error) {
      setSnackbar({ open: true, message: getErrorMessage(error, 'Failed to load data'), severity: 'error' });
    }
  }, [tab, filter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleViewAvailability = async (doctor) => {
    setSelectedDoctor(doctor);
    try {
      const res = await api.get('/availabilities/', { params: { doctor_id: doctor.id } });
      setAvailabilities(Array.isArray(res.data) ? res.data : res.data.results || []);
      setOpenBooking(true);
    } catch (error) {
      setSnackbar({ open: true, message: getErrorMessage(error, 'Failed to load availability'), severity: 'error' });
    }
  };

  const handleBookAppointment = async () => {
    try {
      await api.post('/appointments/', {
        doctor_id: selectedDoctor.id,
        date: bookingData.date,
        time: bookingData.time,
      });
      setOpenBooking(false);
      setBookingData({ date: '', time: '' });
      loadData();
      setSnackbar({ open: true, message: 'Appointment booked', severity: 'success' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getErrorMessage(error, 'Error booking appointment'),
        severity: 'error',
      });
    }
  };

  const handleCancel = async (aptId) => {
    try {
      await api.post(`/appointments/${aptId}/cancel/`);
      loadData();
      setSnackbar({ open: true, message: 'Appointment cancelled', severity: 'success' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getErrorMessage(error, 'Error cancelling appointment'),
        severity: 'error',
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await api.patch(`/patients/${profile.id}/`, profile);
      loadData();
      setSnackbar({ open: true, message: 'Profile updated', severity: 'success' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getErrorMessage(error, 'Error updating profile'),
        severity: 'error',
      });
    }
  };

  const specialties = [...new Set(doctors.map(d => d.specialty?.name).filter(Boolean))];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Patient Dashboard</Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Doctors" />
        <Tab label="Profile" />
        <Tab label="My Appointments" />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              select
              label="Filter by Specialty"
              value={filter.specialty}
              onChange={(e) => {
                setFilter({ ...filter, specialty: e.target.value });
              }}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All</MenuItem>
              {specialties.map((spec) => (
                <MenuItem key={spec} value={spec}>{spec}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Search by Name"
              value={filter.name}
              onChange={(e) => {
                setFilter({ ...filter, name: e.target.value });
              }}
              sx={{ flex: 1 }}
            />
          </Box>
          {doctors.length === 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              No doctors available to display. Make sure a doctor account is approved by an Admin and has set availability.
            </Alert>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Specialty</TableCell>
                  <TableCell>Bio</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      {doctor.user?.first_name} {doctor.user?.last_name} ({doctor.user?.username})
                    </TableCell>
                    <TableCell>{doctor.specialty?.name || 'N/A'}</TableCell>
                    <TableCell>{doctor.bio || 'N/A'}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleViewAvailability(doctor)}>
                        Book Appointment
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {tab === 1 && profile && (
        <Paper sx={{ p: 3, mt: 2 }}>
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
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            margin="normal"
            value={profile.date_of_birth || ''}
            onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </Paper>
      )}

      {tab === 2 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>{apt.doctor?.user?.username}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>
                    <Chip label={apt.status} color={
                      apt.status === 'confirmed' ? 'success' :
                      apt.status === 'cancelled' ? 'error' :
                      apt.status === 'completed' ? 'info' : 'warning'
                    } />
                  </TableCell>
                  <TableCell>
                    {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                      <Button size="small" color="error" onClick={() => handleCancel(apt.id)}>
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openBooking} onClose={() => setOpenBooking(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book Appointment with {selectedDoctor?.user?.username}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>Available Times:</Typography>
          {availabilities.length > 0 ? (
            availabilities.map((avail) => (
              <Chip
                key={avail.id}
                label={`${avail.day_of_week}: ${avail.start_time} - ${avail.end_time}`}
                sx={{ m: 0.5 }}
              />
            ))
          ) : (
            <Typography>No availability set</Typography>
          )}
          <TextField
            fullWidth
            label="Date"
            type="date"
            margin="normal"
            value={bookingData.date}
            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: minDate }}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            margin="normal"
            value={bookingData.time}
            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: minTime }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBooking(false)}>Cancel</Button>
          <Button onClick={handleBookAppointment} variant="contained">Book</Button>
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

export default PatientDashboard;

