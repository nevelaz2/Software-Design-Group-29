import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile'; 
import FuelQuoteForm from './FuelQuoteForm'; 
import QuoteHistory from './QuoteHistory'; 
import NavigationBar from './NavigationBar';
import './NavigationBar.css'
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar activeTab="profile"/>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/fuel-quote" element={<FuelQuoteForm/>} />
          <Route path="/quote-history" element={<QuoteHistory/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
