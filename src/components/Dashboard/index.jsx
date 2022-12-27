import React, { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
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
          <h2 className="title">Hi! Here your Profile!</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update" className="btn btn-primary w-100 mt-4">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button className="text-white" variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
