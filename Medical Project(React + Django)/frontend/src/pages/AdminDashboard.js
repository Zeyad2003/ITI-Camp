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
  Chip,
} from '@mui/material';
import api from '../api/axios';

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState({ name: '', description: '' });

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    try {
      if (tab === 0) {
        const res = await api.get('/users/');
        setUsers(Array.isArray(res.data) ? res.data : res.data.results || []);
      } else if (tab === 1) {
        const res = await api.get('/appointments/');
        setAppointments(Array.isArray(res.data) ? res.data : res.data.results || []);
      } else if (tab === 2) {
        const res = await api.get('/specialties/');
        setSpecialties(Array.isArray(res.data) ? res.data : res.data.results || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await api.post(`/users/${userId}/approve/`);
      loadData();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleBlock = async (userId) => {
    try {
      await api.post(`/users/${userId}/block/`);
      loadData();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleAddSpecialty = async () => {
    try {
      await api.post('/specialties/', newSpecialty);
      setNewSpecialty({ name: '', description: '' });
      loadData();
    } catch (error) {
      console.error('Error adding specialty:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Users" />
        <Tab label="Appointments" />
        <Tab label="Specialties" />
      </Tabs>

      {tab === 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.is_approved ? 'Approved' : 'Pending'}
                      color={user.is_approved ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    {!user.is_approved && (
                      <Button size="small" onClick={() => handleApprove(user.id)}>
                        Approve
                      </Button>
                    )}
                    <Button size="small" color="error" onClick={() => handleBlock(user.id)}>
                      Block
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tab === 1 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>{apt.patient?.user?.username}</TableCell>
                  <TableCell>{apt.doctor?.user?.username}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>{apt.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tab === 2 && (
        <Box sx={{ mt: 2 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Add Specialty</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <input
                type="text"
                placeholder="Name"
                value={newSpecialty.name}
                onChange={(e) => setNewSpecialty({ ...newSpecialty, name: e.target.value })}
                style={{ padding: '8px', flex: 1 }}
              />
              <input
                type="text"
                placeholder="Description"
                value={newSpecialty.description}
                onChange={(e) => setNewSpecialty({ ...newSpecialty, description: e.target.value })}
                style={{ padding: '8px', flex: 1 }}
              />
              <Button variant="contained" onClick={handleAddSpecialty}>Add</Button>
            </Box>
          </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {specialties.map((spec) => (
                  <TableRow key={spec.id}>
                    <TableCell>{spec.name}</TableCell>
                    <TableCell>{spec.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;

