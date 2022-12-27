import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch {
      setError('Failed to create an account (min 6 symbols required!');
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="title">Getting Started</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Control type="email" ref={emailRef} required placeholder="Email address *" />
            </Form.Group>

            <Form.Group id="password" className="mb-3">
              <Form.Control type="password" ref={passwordRef} required placeholder="Password *" />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                placeholder="Confirm password *"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4 mb-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2 text-white">
        Already have an account?{' '}
        <Link className="text-white" to="/login">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
