import { createSlice } from '@reduxjs/toolkit';
import { addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from '../../utils/localStorage';
import { RootState } from '../store';
import { clearTasks } from './tasks';
import { useDispatch } from 'react-redux';

export interface AuthState {
    isAuthenticated: boolean;
    userName: string;
    accessToken: string;
    email: string;
}

const initialState: AuthState = getUserFromLocalStorage();

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.userName = action.payload.userName;
            state.accessToken = action.payload.accessToken;
            state.email = action.payload.email;
            addUserToLocalStorage(action.payload);
        },
        logout: state => {
            state.isAuthenticated = false;
            state.userName = '';
            state.accessToken = '';
            state.email = '';
            removeUserFromLocalStorage();
        },
    },
});

export const logoutAndClearTasks = () => (dispatch: any) => {
    dispatch(logout());
    dispatch(clearTasks());
};

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
