import styled from 'styled-components';

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 22px;
    background-color: rgba(59, 130, 246, 0.6);
    @media screen and (max-width: 600px) {
        flex-direction: column;
        gap: 20px;
    }
    @media screen and (max-width: 306px) {
        padding: 16px 8px;
    }
    h2 {
        font-family: 'Roboto Condensed';
        font-style: normal;
        font-weight: 700;
        font-size: 50px;
        line-height: 59px;
        /* identical to box height */

        letter-spacing: 0.06em;

        /* blue */

        color: #3b82f6;
    }
    .nav-right {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 46px;

        & > div {
            display: flex;
            align-items: center;
            gap: 30px;
        }
        .user-container {
            min-width: fit-content;
            padding: 10px 30px;
            height: fit-content;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            border-radius: 10px;
            background: var(--blue, #3b82f6);
            color: #fff;
            font-family: Roboto Condensed;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 1.2px;
            text-transform: capitalize;
            p {
                margin: 0;
            }
            @media screen and (max-width: 600px) {
                padding: 7.5px 15px;
                font-size: 16px;
            }
        }
        .dropdown-logout-container {
            min-width: fit-content;
            padding: 10px 30px;
            height: fit-content;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            border-radius: 10px;
            background: var(--light-blue, #bfdbfe);
            color: var(--blue, #3b82f6);
            font-family: Roboto Condensed;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 1.2px;
            text-transform: capitalize;
            cursor: pointer;
            p {
                margin: 0;
            }
            @media screen and (max-width: 600px) {
                padding: 7.5px 15px;
                font-size: 16px;

                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
`;

export default Wrapper;
