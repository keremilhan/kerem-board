import styled from 'styled-components';

const Wrapper = styled.main`
    height: 100%;
    .main {
        display: flex;
        gap: 28px;
        padding: 0 50px;
        height: calc(100% - 92px);
        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            gap: 0;
            height: fit-content;
            padding: 0 20px;
        }
        section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: fit-content;
            margin: auto;
            @media screen and (max-width: 768px) {
                width: 100%;
                margin: 0 auto;
                margin-top: 20px;
            }
        }
        h2 {
            text-align: center;
            color: var(--text-color);
            font-size: 36px;
            @media screen and (max-width: 768px) {
                font-size: 32px;
            }
        }
        p {
            font-family: 'Cabin';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 32px;
            color: var(--text-color);
            @media screen and (max-width: 768px) {
                text-align: center;
                font-size: 14px;
                line-height: 28px;
            }
        }
        img {
            width: 50%;
            @media screen and (max-width: 768px) {
                width: 100%;
            }
        }
    }
`;

export default Wrapper;
