import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: fit-content;
    width: fit-content;
    gap: 12px;
    cursor: pointer;
    img {
        width: 50px;
        height: 50px;
        @media screen and (max-width: 600px) {
            width: 40px;
            height: 40px;
        }
        @media screen and (max-width: 280px) {
            width: 30px;
            height: 30px;
        }
    }
    h1 {
        color: var(--blue, #3b82f6);
        font-family: Roboto Condensed;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1.8px;
        @media screen and (max-width: 600px) {
            font-size: 26px;
        }
        @media screen and (max-width: 280px) {
            font-size: 22px;
        }
    }
`;

export default Wrapper;
