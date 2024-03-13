import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Profile from './Profile'; 
// import FuelQuoteForm from './FuelQuoteForm'; 
// import QuoteHistory from './QuoteHistory'; 
// import Sidebar from './Sidebar';
// import './Sidebar.css'
import '../styles/App.css';

import NavigationBar from './NavigationBar'
import Home from './Home'
import AboutUs from './AboutUs'
import Login from './Login'
import SignUp from './SignUp'

const App = () => {
  return (
    <Router>
      <div>
        {/* <Sidebar activeTab="profile"/>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/fuel-quote" element={<FuelQuoteForm/>} />
          <Route path="/quote-history" element={<QuoteHistory/>} />
        </Routes> */}
        <NavigationBar />
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
