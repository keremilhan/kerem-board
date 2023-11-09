import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Landing';
import Navbar from '../components/Navbar';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slices/auth';

const Landing = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector(selectAuth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [navigate]);
    return (
        <Wrapper>
            <Navbar />
            <div className="main">
                <section>
                    <h2>Schedule & Track Your Tasks</h2>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                        McClintock, a Latin professor at Hampden-Sydney College in Virginia.
                    </p>
                </section>
                <img src="./images/board.svg" alt="" />
            </div>
        </Wrapper>
    );
};

export default Landing;
