import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';

const PrivateRoute = () => {
    const { isAuthenticated } = useAppSelector(selectAuth);
    return isAuthenticated ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoute;
