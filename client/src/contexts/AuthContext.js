import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constant';
import { authReducer } from '../reducers/authReducer';
import setAuthToken from '../untils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // Authenticate
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const res = await axios.get(`${apiUrl}/users`);
            if (res.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: res.data.user },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    useEffect(() => loadUser(), []);
    // Login
    const loginUser = async (userForm) => {
        console.log('KQ: ', userForm);
        try {
            const response = await axios.post(
                `${apiUrl}/users/login`,
                userForm
            );
            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
                return response.data;
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    message: error.message,
                };
            }
        }
    };

    // context data
    const authContextData = { loginUser, authState };
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
