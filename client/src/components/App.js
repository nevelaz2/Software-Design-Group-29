import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicView from '../views/PublicView';
import UserPortal from '../views/UserPortal';
// import '../styles/App.css';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="*" element={<PublicView/>}/>
          <Route path="/user/*" element={<UserPortal/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
