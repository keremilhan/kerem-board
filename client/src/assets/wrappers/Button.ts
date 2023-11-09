import styled from 'styled-components';

const Wrapper = styled.button`
    background-color: ${props => (props.color ? props.color : '#3B82F6')};
    border-radius: 21px;
    height: 60px;
    padding: 0 47px;
    font-family: 'Roboto Condensed';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.2px;
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    @media screen and (max-width: 515px) {
        height: 30px;
        padding: 0 25px;
    }
`;

export default Wrapper;
