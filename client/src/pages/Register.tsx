/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/Register';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import customToast from '../components/customToast';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginSuccess, logout, selectAuth } from '../redux/slices/auth';

const initialState = {
    name: '',
    email: '',
    password: '',
};

const Register = () => {
    const navigate = useNavigate();
    const [isMember, setIsMember] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const dispatch = useAppDispatch();
    const { userName, isAuthenticated } = useAppSelector(selectAuth);
    const { REACT_APP_API_BASE_URL } = process.env;

    const handleChange = (event: any) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!isMember) {
            try {
                const API_ENDPOINT = `${REACT_APP_API_BASE_URL}/api/v1/auth/register`;
                const response = await axios.post(API_ENDPOINT, formValues);
                customToast('Registration successful. Welcome to the app!', 'success');
                setIsMember(true);
                setFormValues(initialState);
            } catch (error: any) {
                if (error.response.status === 429) {
                    customToast('Too many requests. Please try again later.', 'error');
                    return;
                }
                customToast(error.response.data.msg, 'error');
                console.error(error);
                setFormValues(initialState);
            }
        } else {
            try {
                const API_ENDPOINT = `${REACT_APP_API_BASE_URL}/api/v1/auth/login`;
                const response = await axios.post(API_ENDPOINT, formValues);
                customToast('Login successful. Welcome to the app!', 'success');
                dispatch(loginSuccess({ isAuthenticated: true, userName: response.data.user.name, accessToken: response.data.user.token, email: response.data.user.email }));
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
                setFormValues(initialState);
            } catch (error: any) {
                if (error.response.status === 429) {
                    customToast('Too many requests. Please try again later.', 'error');
                    return;
                }
                customToast(error.response.data.msg, 'error');
                console.error(error);
            }
        }
    };

    const handleDemo = async () => {
        let testUser = {
            email: 'testUser@gmail.com',
            password: 'secret',
        };
        try {
            const API_ENDPOINT = `${REACT_APP_API_BASE_URL}/api/v1/auth/login`;
            const response = await axios.post(API_ENDPOINT, testUser);
            customToast('Login successful. Welcome to the app!', 'success');
            dispatch(loginSuccess({ isAuthenticated: true, userName: response.data.user.name, accessToken: response.data.user.token, email: response.data.user.email }));
            navigate('/dashboard');
            setFormValues(initialState);
        } catch (error: any) {
            if (error.response.status === 429) {
                customToast('Too many requests. Please try again later.', 'error');
                return;
            }
            customToast(error.response.data.msg, 'error');
            console.error(error);
            setFormValues(initialState);
        }
    };

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Wrapper>
            <Navbar name={userName} />
            <div className="register-main">
                <div className="left">
                    <img src="./images/register-page.svg" alt="" />
                </div>
                <div className="right">
                    {isAuthenticated ? (
                        <div className="authenticated">
                            <p>You are alreay logged in. Please logout first in order to login with a different account.</p>
                            <Button color="#BFDBFE" textColor="#3B82F6" handleClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="form-area">
                            <h3>{isMember ? 'LOGIN' : 'REGISTER'}</h3>
                            <form onSubmit={handleSubmit}>
                                {!isMember && (
                                    <div className="form-row">
                                        <label htmlFor="name">Name</label>
                                        <input required id="name" type="text" name="name" value={formValues.name} onChange={handleChange} />
                                    </div>
                                )}
                                <div className="form-row">
                                    <label htmlFor="email">Email</label>
                                    <input required id="email" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="password">Password</label>
                                    <input required id="password" type="password" name="password" value={formValues.password} onChange={handleChange} />
                                </div>
                                {/* <Link to={'/dashboard'}> */}
                                <Button type="submit">SUBMIT</Button>
                                {/* </Link> */}
                            </form>
                            {/* <button onClick={handleDemo}>demo</button> */}
                            <Button handleClick={handleDemo} color="#BFDBFE" textColor="#3B82F6">
                                DEMO APP
                            </Button>
                            <p className="already-member">
                                {!isMember ? 'Already a member?' : 'Not a member yet?'}
                                <span onClick={() => setIsMember(!isMember)}>{!isMember ? 'Login' : 'Register'}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default Register;
