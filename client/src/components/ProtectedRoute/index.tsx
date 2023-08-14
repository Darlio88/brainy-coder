import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

//isAuthenticated
import IsLoggedIn from '../../utils/isLoggedIn';

//protected create challenge route
import Create from '../../pages/Create';

const Index = () => {
    const isLoggedIn = IsLoggedIn();
    const content = isLoggedIn ? (
        <Create />
    ) : (
        <Navigate to="/auth/sign-in" replace />
    );
    return content;
};

export default Index;
