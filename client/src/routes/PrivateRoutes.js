// Application private routes configuration

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import FuelQuotes from '../components/FuelQuotes';

const PrivateRoutes = () => {
  return (
    <Routes>
      {/* Registered users */}
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/fuel-quotes" element={<FuelQuotes/>}/>
    </Routes>
  );
};

export default PrivateRoutes;
