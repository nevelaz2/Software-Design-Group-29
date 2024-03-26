// Displays view for registered users. Private view. 

import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Sidebar.css'
import PrivateRoutes from '../routes/PrivateRoutes';

const UserPortal = () => {
    return (
        <div>
            <Sidebar/>
            <PrivateRoutes/>
        </div>
        
    );
};

export default UserPortal;
