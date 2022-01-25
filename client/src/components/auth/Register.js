import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="userName"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="confirmpassword"
                        name="confirmPassword"
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                You have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className="ml-2">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default Register;
