import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';

const PrivateRoute = () => {
    const { isAuthenticated } = useAppSelector(selectAuth);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoute;
