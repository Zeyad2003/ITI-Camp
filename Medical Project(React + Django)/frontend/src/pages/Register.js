import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    role: 'patient',
  });
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [newSpecialtyDescription, setNewSpecialtyDescription] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const res = await api.get('/specialties/');
        const list = Array.isArray(res.data) ? res.data : res.data.results || [];
        setSpecialties(list);
      } catch (err) {
        setSpecialties([]);
      }
    };
    if (formData.role === 'doctor') {
      loadSpecialties();
    } else {
      setSelectedSpecialty('');
      setNewSpecialtyName('');
      setNewSpecialtyDescription('');
    }
  }, [formData.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }
    const payload = { ...formData };
    if (formData.role === 'doctor') {
      if (newSpecialtyName.trim()) {
        payload.specialty_name = newSpecialtyName.trim();
        if (newSpecialtyDescription.trim()) {
          payload.specialty_description = newSpecialtyDescription.trim();
        }
      } else if (selectedSpecialty) {
        payload.specialty_id = Number(selectedSpecialty);
      }
    }
    const result = await register(payload);
    if (result.success) {
      navigate('/');
    } else {
      setError(typeof result.error === 'string' ? result.error : JSON.stringify(result.error));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              margin="normal"
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              margin="normal"
              value={formData.last_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              select
              label="Role"
              name="role"
              margin="normal"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </TextField>
            {formData.role === 'doctor' && (
              <>
                <TextField
                  fullWidth
                  select
                  label="Specialty"
                  margin="normal"
                  value={selectedSpecialty}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedSpecialty(value);
                    if (value) {
                      setNewSpecialtyName('');
                      setNewSpecialtyDescription('');
                    }
                  }}
                  helperText="Choose an existing specialty or request a new one below."
                >
                  <MenuItem value="">Request new specialty</MenuItem>
                  {specialties.map((spec) => (
                    <MenuItem key={spec.id} value={spec.id}>
                      {spec.name}
                    </MenuItem>
                  ))}
                </TextField>
                {selectedSpecialty === '' && (
                  <>
                    <TextField
                      fullWidth
                      label="New Specialty Name"
                      margin="normal"
                      value={newSpecialtyName}
                      onChange={(e) => {
                        setSelectedSpecialty('');
                        setNewSpecialtyName(e.target.value);
                      }}
                      required
                    />
                    <TextField
                      fullWidth
                      label="New Specialty Description (optional)"
                      margin="normal"
                      value={newSpecialtyDescription}
                      onChange={(e) => {
                        setSelectedSpecialty('');
                        setNewSpecialtyDescription(e.target.value);
                      }}
                      multiline
                      minRows={2}
                      helperText="Admin approval is required for new specialties."
                    />
                  </>
                )}
              </>
            )}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="password2"
              type="password"
              margin="normal"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;

