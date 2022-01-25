import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import LoginForm from '../components/auth/LoginForm';
import Register from '../components/auth/Register';
import { AuthContext } from '../contexts/AuthContext';

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;
    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    } else {
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <Register />}
            </>
        );
    }

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn It</h1>
                    <h4>Keep track of what you . . .</h4>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
