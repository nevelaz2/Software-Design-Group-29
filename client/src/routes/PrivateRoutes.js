// Application private routes configuration

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import FuelQuotes from '../components/FuelQuotes';
import QuoteHistory from '../components/QuoteHistory';

const PrivateRoutes = () => {
  return (
    <Routes>
      {/* Registered users */}
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/fuel-quotes" element={<FuelQuotes/>}/>
      <Route path="/quote-history" element={<QuoteHistory/>}/>
    </Routes>
  );
};

export default PrivateRoutes;
