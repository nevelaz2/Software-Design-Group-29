// Displays view for unregistered users. Default view. 

import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Hero from '../components/Hero';
import PublicRoutes from '../routes/PublicRoutes';

const PublicView = () => {
    return (
        <div>
            <NavigationBar/>
            <Hero/>
            <PublicRoutes/>
        </div>
        
    );
};


export default PublicView;
