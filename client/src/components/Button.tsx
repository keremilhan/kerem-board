import React from 'react';
import Wrapper from '../assets/wrappers/Button';

const Button: React.FC<{
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    padding?: string;
    children: string;
    color?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    height?: string;
    textColor?: string;
}> = ({ handleClick, children, color, type, height, textColor, padding }) => {
    return (
        <Wrapper onClick={handleClick} style={{ height: height, color: textColor, padding }} type={type || 'button'} color={color}>
            {children}
        </Wrapper>
    );
};

export default Button;
