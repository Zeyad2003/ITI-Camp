import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  } else if (user.role === 'doctor') {
    return <DoctorDashboard />;
  } else if (user.role === 'patient') {
    return <PatientDashboard />;
  }

  return <div>Unknown role</div>;
};

export default Home;

