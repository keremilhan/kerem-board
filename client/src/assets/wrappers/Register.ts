import styled from 'styled-components';

const Wrapper = styled.main`
    height: 100%;
    .register-main {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        @media screen and (max-width: 1200px) {
            flex-direction: column-reverse;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 20px;
            height: fit-content;
            padding: 0 20px;
            margin-top: 10px;
        }
        .left {
            width: 50%;
            height: 780px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            @media screen and (max-width: 1200px) {
                width: 100%;
                height: fit-content;
                margin-top: 20px;
            }
            img {
                width: 579.23px;
                height: 563.51px;
                @media screen and (max-width: 1200px) {
                    width: 100%;
                    height: auto;
                    margin-top: 20px;
                }
            }
        }

        .right {
            width: 50%;
            height: 780px;
            display: flex;
            justify-content: center;
            border-left: 5px solid #1c354d;
            margin: auto;
            * {
                @media screen and (max-width: 515px) {
                    font-size: 90%;
                }
            }
            @media screen and (max-width: 1200px) {
                width: 70%;
                height: fit-content;
                border-left: none;
            }
            @media screen and (max-width: 900px) {
                width: 100%;
            }
            .authenticated {
                display: flex;
                flex-direction: column;
                height: 100%;
                align-items: center;
                justify-content: center;
            }
            .form-area {
                width: 60%;
                margin: auto;
                /* width: 547px; */
                height: fit-content;
                background-color: #d1e7dd;
                border-radius: 70px;
                padding: 40px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                @media screen and (max-width: 1500px) {
                    width: 70%;
                    height: fit-content;
                    padding: 15px 0;
                }
                @media screen and (max-width: 1200px) {
                    width: 100%;
                    height: fit-content;
                    padding: 15px 0;
                }
                @media screen and (max-width: 515px) {
                    border-radius: 30px;
                }

                h3 {
                    font-family: 'Cabin';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 32px;
                    line-height: 39px;
                    /* identical to box height */

                    letter-spacing: 0.1em;
                    text-align: center;
                    @media screen and (max-width: 515px) {
                        font-size: 20px;
                    }
                }
                form {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;

                    .form-row {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 80%;
                        margin: auto;
                        @media screen and (max-width: 515px) {
                            width: 90%;
                        }
                        label {
                            font-family: 'Cabin';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 26px;
                            /* identical to box height */
                            color: #1c354d;
                            /* margin-top: 24px; */
                            margin-right: auto;
                            @media screen and (max-width: 515px) {
                                font-size: 16px;
                            }
                        }
                        input {
                            /* width: 439px; */
                            width: 100%;
                            height: 56px;

                            /* light green */

                            background: #d1e7dd;
                            /* dark blue */

                            border: 2px solid #1c354d;
                            border-radius: 13px;
                            font-size: 26px;
                            padding: 0 10px;

                            @media screen and (max-width: 1200px) {
                                width: 100%;
                            }
                            @media screen and (max-width: 515px) {
                                height: 32px;
                                font-size: 14px;
                                border-radius: 6px;
                            }
                        }
                    }
                    Button {
                        margin-top: 37px;
                        width: 80%;
                        @media screen and (max-width: 515px) {
                            margin-top: 10px;
                            width: 90%;
                        }
                    }
                }
                Button {
                    margin-top: 16px;
                    width: 80%;
                    @media screen and (max-width: 515px) {
                        width: 90%;
                    }
                }
                .already-member {
                    display: inline-block;
                    font-family: 'Roboto Condensed';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 26px;
                    line-height: 30px;
                    letter-spacing: 0.06em;
                    color: #1c354d;
                    @media screen and (max-width: 1200px) {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                    }
                    @media screen and (max-width: 515px) {
                        font-size: 14px;
                        flex-direction: row;
                    }
                    span {
                        margin-left: 15px;
                        color: #3b82f6;
                        cursor: pointer;
                        @media screen and (max-width: 1200px) {
                            margin-left: 0;
                        }
                    }
                }
            }
        }
    }
`;

export default Wrapper;
