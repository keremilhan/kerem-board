import { AuthState } from '../redux/slices/auth';
export const addUserToLocalStorage = (auth: AuthState) => {
    localStorage.setItem('auth', JSON.stringify(auth));
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('auth');
};

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('auth');
    const user = result ? JSON.parse(result) : { isAuthenticated: false, userName: '', accessToken: '', email: '' };
    return user;
};
