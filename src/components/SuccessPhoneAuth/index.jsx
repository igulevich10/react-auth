import React, { useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UilCheckCircle } from '@iconscout/react-unicons';

const SuccessPhoneAuth = () => {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="title">
            <UilCheckCircle className="success-check" />
            Success Phone Auth!
          </h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Link to="/login" className="btn btn-secondary w-100 mt-4" onClick={handleLogOut}>
            Log Out
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SuccessPhoneAuth;
