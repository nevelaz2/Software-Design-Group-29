import "bootstrap/dist/css/bootstrap.min.css";
// import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PublicView from "../views/PublicView";
import UserPortal from "../views/UserPortal";
import { useAuth } from "../contexts/AuthContext";
// import '../styles/App.css';

const App = () => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated= localStorage.getItem("isAuthenticated");

  return (
    <Router>
      <div>
        <Routes>
          <Route path="*" element={<PublicView />} />
          {console.log(isAuthenticated)};
          <Route path="/user/*" element={isAuthenticated ? <UserPortal /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
