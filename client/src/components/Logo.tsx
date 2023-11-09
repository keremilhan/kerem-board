import React from 'react';
import Wrapper from '../assets/wrappers/Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';

const Logo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPathname = location.pathname;
    const { isAuthenticated } = useAppSelector(selectAuth);

    let logoText = 'KEREM BOARD';

    if (currentPathname === '/dashboard') {
        logoText = 'DASHBOARD';
    }

    const handleClick = () => {
        if (!isAuthenticated) {
            navigate('/');
        }
    };
    return (
        <Wrapper onClick={handleClick}>
            <img src="./images/logo.png" alt="kerem-board" />
            <h1>{logoText}</h1>
        </Wrapper>
    );
};

export default Logo;
