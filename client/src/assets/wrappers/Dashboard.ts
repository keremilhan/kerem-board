import styled from 'styled-components';

const Wrapper = styled.div`
    /* background-color: #bfdbfe; */
    background-color: #fff;
    height: 100vh;
    position: relative;

    .delete-module {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* z-index: 15; */

        .delete-module-container {
            z-index: 30;
            background-color: #fff;
            width: 240px;
            /* min-height: 543px; */
            height: fit-content;
            border-radius: 7px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 15px 0;
            gap: 15px;
            font-family: Roboto Condensed;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.84px;
            p {
                margin: 0;
            }
            .buttons {
                display: flex;
                align-items: center;
                gap: 10px;
                button {
                    outline: none;
                    border: none;
                    padding: 2.5px 15px;
                    padding-top: 4px;
                    cursor: pointer;
                    border-radius: 7px;
                    color: white;
                }
                .yes-btn {
                    background-color: #ff0000;
                }
                .no-btn {
                    background-color: #3b82f6;
                }
            }
        }
    }
    .top {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding-right: 22px;
        padding-left: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .calendar {
        width: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 5px;
        @media screen and (max-width: 600px) {
            svg {
                width: 30px;
                height: 30px;
            }
        }
        .show-calendar {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.7);
            cursor: default;

            .calendar-spinner-container {
                width: 578px;
                height: 381.95px;
                background-color: white;
            }
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
                @media screen and (max-width: 600px) {
                    width: 100% !important;
                    .rdrCalendarWrapper {
                        font-size: 9px !important;
                    }
                    .rdrDefinedRangesWrapper {
                        width: fit-content !important;
                        font-size: 19x !important;
                    }
                    .rdrStaticRangeLabel {
                        padding: 2.5px 5px;
                    }
                }

                .close {
                    cursor: pointer;
                    font-size: 16px;
                    height: fit-content;
                    align-self: flex-end;
                    color: #000;
                    font-weight: 700;
                    padding: 5px;
                }
            }
        }

        & > div {
            cursor: pointer;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }
        p {
            color: var(--dark-blue, #1c354d);
            font-family: Cabin;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0.1px;
            margin: 0;
            align-self: center;
            @media screen and (max-width: 600px) {
                font-size: 16px;
            }
        }
    }
    .columns-select {
        width: fit-content;
        border: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
        /* background-color: lightgray; */
        padding: 5px 10px;
    }
    .board {
        /* background-color: #bfdbfe; */
        background-color: #fff;
        width: 100%;
        height: calc(100vh - 157px);
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 0 22px;
        gap: 6px;
        @media screen and (max-width: 1000px) {
            flex-direction: column;
        }
        .task-column {
            width: 100%;
            padding: 18px;
            padding-bottom: 40px !important;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 15px;
            overflow-y: auto;
            background-color: #f4f5f7;
            border-radius: 7px 7px 0 0;
            &::-webkit-scrollbar {
                width: 6px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #f4f5f7;
                border-radius: 86px;
            }

            .heading-container {
                display: flex;
                align-items: center;
                gap: 14px;
                .column-heading {
                    color: var(--dark-blue, #1c354d);
                    font-family: Cabin;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                .info-sticker {
                    color: var(--blue, #3b82f6);
                    font-family: Cabin;
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    letter-spacing: 1.5px;
                }
            }
        }

        .tasks {
            height: fit-content;
            padding-top: 22px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .open {
            border-right: 1px solid #fff;
        }
        .in-progress {
            border-right: 1px solid #fff;
        }
    }
`;

export default Wrapper;
