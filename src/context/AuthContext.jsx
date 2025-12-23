import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    axios.defaults.headers.common['x-auth-token'] = token;
                    const res = await axios.get(API_ENDPOINTS.AUTH.USER);
                    setUser(res.data);
                } catch (err) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
            const { token, user: userData } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common['x-auth-token'] = token;

            setUser(userData);
            return userData;
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.msg || 'Invalid Credentials! Please check your email and password.';
            throw new Error(msg);
        }
    };

    const signup = async (userData) => {
        try {
            const res = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
            return res.data;
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.msg || 'Signup failed';
            throw new Error(msg);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
