import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleSignIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="title">Welcome back!</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Control type="email" ref={emailRef} required placeholder="Email address *" />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control type="password" ref={passwordRef} required placeholder="Password *" />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <hr />
          <div>
            <GoogleButton
              disabled={loading}
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
          <Link to="/phone-sign">
            <Button disabled={loading} variant="success" className="w-100 mt-4" type="submit">
              Sign in with phone
            </Button>
          </Link>
          <div className="w-100 text-center mt-4">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 text-white">
        Need an account?{' '}
        <Link className="text-white" to="/signup">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
