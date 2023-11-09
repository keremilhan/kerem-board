import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: fit-content;

    .show-calender {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
        cursor: default;
        .calendar-container {
            width: fit-content;
            height: fit-content;
            padding: 0 10px;
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            justify-content: center;
            /* background-color: #39414c; */
            background-color: #fff;
            .rdrMonthAndYearWrapper {
                height: fit-content !important;
                padding-top: 0 !important;
            }
            .close {
                cursor: pointer;
                font-size: 18px;
                height: fit-content;
                align-self: flex-end;
                color: #000;
                font-weight: 700;
                padding: 0 5px;
            }
        }
    }

    .new-task-bg {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }
    .new-task-container {
        background-color: #3b82f6;
        width: 500px;
        height: fit-content;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end !important;
            h2 {
                font-family: 'Cabin';
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                letter-spacing: 0.1em;
                text-align: center;
                width: fit-content;
                color: #fff;
                margin: auto;
            }
            span {
                margin-right: 0;
                cursor: pointer;
                color: #fff;
            }
        }

        form {
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding: 15px 25px;

            .another-slice {
                width: 100%;
                height: 35px;
                border: 1px dashed #f0f4f8;
                color: #bfdbfe;
                font-family: Cabin;
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                    border-style: solid;
                }
            }

            .date-time {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                .date-container {
                    & > div {
                        cursor: pointer;
                        width: fit-content;
                        height: fit-content;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    p {
                        margin: 0;
                    }
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding-left: 10px;
                    border-radius: 10px;
                    height: 35px;
                    color: rgba(0, 0, 0, 0.3);
                    font-family: Cabin;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    letter-spacing: 0.13px;
                    background-color: #f0f4f8;
                }

                .estimated-time-container {
                    display: flex;
                    width: 50%;
                    background-color: #f0f4f8;
                    input {
                        width: 100%;
                    }
                    select {
                        width: 100%;
                        cursor: pointer;
                        background-color: #f0f4f8;
                        border: none;
                        outline: none;
                    }
                }
            }

            .subtask-input-container {
                display: flex;
                align-items: center;
                gap: 10px;

                div {
                    height: 100%;
                    width: fit-content;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
            }
            .submit-btn {
                width: fit-content;
                margin: auto;
                border-radius: 10px;
                background: var(--light-blue, #bfdbfe);
                color: var(--blue, #3b82f6);
                font-family: Roboto Condensed;
                font-size: 20px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                letter-spacing: 2.18px;
                align-self: flex-end;
                justify-self: flex-end;
                margin-bottom: 0;
                padding: 5px 10px;
            }

            input {
                width: 100%;
                height: 35px;
                background-color: #f0f4f8;
                border-radius: 10px;
                border: 0;
                outline: 0;
                padding-left: 10px;
                color: #3b82f6;
                font-weight: 400;
                font-family: Cabin;
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: #000;
                &::placeholder {
                    font-family: Cabin;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: rgba(0, 0, 0, 0.3);
                }

                &:focus::-webkit-input-placeholder {
                    color: transparent;
                }
                &:focus:-moz-placeholder {
                    color: transparent;
                } /* Firefox 18- */
                &:focus::-moz-placeholder {
                    color: transparent;
                } /* Firefox 19+ */
                &:focus:-ms-input-placeholder {
                    color: transparent;
                } /* oldIE ;) */
            }
            button {
                width: 50%;
                margin: auto;
                cursor: pointer;
                outline: 0;
                border: 0;
                background: #3b82f6;
                color: #fff;
                border-radius: 10px;
                padding: 5px 0;
                font-family: 'Cabin';
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 39px;
                letter-spacing: 0.1em;
            }
        }
    }

    .new-task-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        gap: 10px;
        width: fit-content;
        height: fit-content;
        padding: 10px;
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        background-color: #14a44d;
        letter-spacing: 0.1em;
        color: #fff;
    }
`;

export default Wrapper;
