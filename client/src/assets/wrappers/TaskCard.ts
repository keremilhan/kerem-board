import styled from 'styled-components';

const Wrapper = styled.div`
    height: fit-content;

    .taskname {
        color: #000;
        font-family: Roboto Condensed;
        font-size: 14px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: 0.84px;
        margin: 0;
        text-transform: capitalize;
        word-break: break-word;
        text-align: left;
    }
    .expanded-card {
        /* background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        border-radius: 15px;
        padding: 20px;
        cursor: pointer; */
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 1px;
        .white-bg {
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        }
        .left {
            position: relative;
            height: 100%;
            width: 92%;
            border-radius: 10px 0px 0px 10px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 15px 12px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            cursor: pointer;
            .estimated-time {
                position: absolute;
                top: 0;
                right: 0;
                background-color: #d1e7dd;
                padding: 0 8px;
                width: fit-content;
                border-radius: 0 0 0 5px;
                color: var(--succes, #14a44d);
                font-family: Roboto Condensed;
                font-size: 12px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 1px;
            }
            .subtasks-list {
                width: 100%;
                font-family: 'Roboto Condensed';
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 23px;
                letter-spacing: 0.06em;
                list-style: none;
                align-self: flex-start;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-end;
                padding-left: 0;
                gap: 11px;
                margin: 0;
                margin-top: 11px;
                margin-bottom: 15px;
                text-transform: capitalize;

                li {
                    color: #000;
                    font-family: Roboto condensed;
                    font-size: 13px;
                    font-weight: 400;
                    line-height: normal;
                    letter-spacing: 0.72px;
                    display: flex;
                    gap: 5px;
                    align-items: center;
                    cursor: default;
                    word-break: break-word;
                    text-align: left;
                    input[type='checkbox'] {
                        accent-color: #14a44d;
                        width: 15px;
                        height: 15px;
                    }

                    &:nth-last-child() {
                        margin-bottom: 5px;
                    }
                }
            }

            #status-select {
                position: absolute;
                bottom: 0;
                right: 0;
                margin-top: 4px;
                padding: 5px 0;
                width: fit-content;
                border: none;
                outline: none;
                border-radius: 5px 0 0 0;
                cursor: pointer;
                background-color: ${prop => prop.theme};
                color: ${prop => prop.color};
            }
        }
        .right {
            height: 100%;
            display: flex;
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 1px;
            width: 8%;
            min-width: fit-content;
            min-height: fit-content;
            .right_top {
                width: 100%;
                background: #fff;
                height: 50%;
                min-height: fit-content;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: move;
                border-radius: 0px 10px 0px 0px;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            }
            .right_bottom {
                height: 50%;
                min-height: fit-content;
                width: 100%;
                background: #fff;
                border-radius: 0px 0px 10px 0px;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 5px;
                padding: 4px 0;
                .icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: fit-content;
                    cursor: pointer;
                }
            }
        }
    }
    .closed-card {
        width: 100%;
        min-width: 250px;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 1px;

        .left,
        .right {
            background: #fff;
        }
        .left {
            width: 92%;
            height: 100%;
            border-radius: 10px 0px 0px 10px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            padding: 15px 12px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .right {
            background: #fff;
            height: 100%;
            width: 8%;
            min-width: fit-content;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 0px 10px 10px 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: move;
        }
    }

    /* .card-top {
        display: flex;
        flex-direction: column;

        .subtasks-list {
            width: 100%;
            font-family: 'Roboto Condensed';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            letter-spacing: 0.06em;
            list-style: none;
            align-self: flex-start;
            color: ${props => (props.color === 'open' ? '##1c354d' : props.color === 'in progress' ? '#1c354d' : '#F0F4F8')};
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
            padding-left: 0;
            gap: 10px;
            margin: 0;
        }
    }  */

    .bottom {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
    }

    .icon-container {
        display: flex;
        align-items: center;
        gap: 5px;
        .icon {
            height: fit-content;
            cursor: pointer;
        }
    }
`;

export default Wrapper;
