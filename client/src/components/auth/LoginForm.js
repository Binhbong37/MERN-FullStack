import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

function LoginForm() {
    const { loginUser } = useContext(AuthContext);

    const history = useHistory();

    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const { username, password } = login;

    const handleOnchangeLogin = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(login);
            if (loginData.success) {
                history.push('/dashboard');
            }
        } catch (error) {
            console.log('catch loginForm: ', error);
        }
    };
    return (
        <>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={handleOnchangeLogin}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={handleOnchangeLogin}
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="sm" className="ml-2">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default LoginForm;
