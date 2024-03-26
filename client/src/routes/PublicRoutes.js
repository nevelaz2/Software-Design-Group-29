// Application public routes configuration

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import AboutUs from '../components/AboutUs';
import Login from '../components/Login';
import SignUp from '../components/SignUp';


const PublicRoutes = () => {
    return (
      <Routes>
  
        {/* Unregistered users */}
        <Route path="/" element={<Home />}/>
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    );
  };
  
  export default PublicRoutes;