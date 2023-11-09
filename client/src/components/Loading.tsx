import { MoonLoader } from 'react-spinners';
import Wrapper from '../assets/wrappers/Loading';
import React from 'react';

const Loading: React.FC<{ size?: number }> = ({ size, ...props }) => {
    return (
        <Wrapper>
            <MoonLoader size={size} color="#3B82F6" speedMultiplier={0.3} {...props} />
        </Wrapper>
    );
};

export default Loading;
