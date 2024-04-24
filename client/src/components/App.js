import "bootstrap/dist/css/bootstrap.min.css";
// import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
import PublicView from "../views/PublicView";
import UserPortal from "../views/UserPortal";
import { useAuth } from "../contexts/AuthContext";
// import '../styles/App.css';

const UserContext = createContext();

const App = () => {
  const { isAuthenticated } = useAuth();
  const [UserName, SetUserName] = useState(null);

  return (
    <UserContext.Provider value={{UserName, SetUserName}}>
      <Router>
        <div>
          <Routes>
            <Route path="*" element={<PublicView/>}/>
            <Route path="/user/*" element={isAuthenticated ? <UserPortal /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export { UserContext };

export default App;
