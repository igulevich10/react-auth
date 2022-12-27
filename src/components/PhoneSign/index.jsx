import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PhoneSign = () => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUpRecaptcha } = useAuth();

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError('');

    if (number === '' || number === undefined) {
      return setError('Please enter valid phone number!');
    }

    try {
      const response = await setUpRecaptcha(number);
      setResult(response);
      setFlag(true);
      setLoading(true);
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (otp === '' || otp === null) return;
    try {
      await result.confirm(otp);
      setLoading(true);
      navigate('/success-phone-auth');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="title">Phone Auth</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={getOtp} style={{ display: !flag ? 'block' : 'none' }}>
            <Form.Group id="phone-number" className="mb-3">
              <PhoneInput
                defaultCountry="UA"
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
              />
              <div id="recaptcha-container" />
            </Form.Group>
            <div className="button-right">
              <Link to="/login">
                <Button variant="secondary">Cancel</Button>
              </Link>{' '}
              &nbsp;
              <Button disabled={loading} variant="primary" type="submit">
                Send OTP
              </Button>
            </div>
          </Form>

          <Form onSubmit={verifyOtp} style={{ display: flag ? 'block' : 'none' }}>
            <Form.Group id="otp" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter OTP *"
                onChange={(e) => setOtp(e.target.value)}></Form.Control>
            </Form.Group>
            <div className="button-right">
              <Link to="/login">
                <Button variant="secondary">Cancel</Button>
              </Link>{' '}
              &nbsp;
              <Button disabled={loading} variant="primary" type="submit">
                Verify
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default PhoneSign;
