import React, { useCallback, useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';
import Button from './Button';
import { Link, useLocation } from 'react-router-dom';
import { logoutAndClearTasks, selectAuth } from '../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { RxExit } from 'react-icons/rx';

const Navbar: React.FC<{ name?: string; dashboard?: boolean }> = ({ name, dashboard }) => {
    const { isAuthenticated } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const currentPathname = location.pathname;

    let text = 'Login/Register';
    let path = '/register';

    if (currentPathname === '/register') {
        text = 'Home';
        path = '/';
    }

    const handleLogout = useCallback(() => {
        dispatch(logoutAndClearTasks());
    }, [dispatch]);

    return (
        <Wrapper>
            <Logo />
            <div className="nav-right">
                {isAuthenticated && (
                    <div>
                        <div className="user-container">
                            <p>{name}</p>
                        </div>
                        <div className="dropdown-logout-container" onClick={handleLogout}>
                            <RxExit size={25} />
                            <p>Logout</p>
                        </div>
                    </div>
                )}
                {!isAuthenticated && (
                    <Link to={path}>
                        {
                            <Button height="fit-content" padding="10px 30px">
                                {text}
                            </Button>
                        }
                    </Link>
                )}
            </div>
        </Wrapper>
    );
};

export default Navbar;
