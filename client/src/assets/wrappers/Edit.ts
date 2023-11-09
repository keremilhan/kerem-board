import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 400px;
    .new-task-container {
        background-color: #fff;
        width: 400px;
        min-height: 450px;
        height: fit-content;
        border-radius: 10%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;

        h2 {
            font-family: 'Cabin';
            font-style: normal;
            font-weight: 400;
            font-size: 32px;
            line-height: 39px;
            letter-spacing: 0.1em;
            margin-top: 10px;
            /* blue */

            color: #3b82f6;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 24px;

            input {
                width: 85%;
                margin: auto;
                background: #bfdbfe;
                border-radius: 10px;
                border: 0;
                outline: 0;
                padding-left: 10px;
                color: #3b82f6;
                font-weight: 400;

                &::placeholder {
                    font-family: 'Cabin';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 24px;
                    letter-spacing: 0.1em;

                    /* blue */

                    color: #3b82f6;
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
                font-size: 32px;
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
        gap: 35px;
        width: 100%;
        height: 80px;
        border: 2px dashed #3b82f6;
        font-family: 'Cabin';
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 39px;
        /* identical to box height */

        letter-spacing: 0.1em;

        /* blue */

        color: #3b82f6;

        &:hover {
            border: 3px solid #3b82f6;
        }
    }
`;

export default Wrapper;
