import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/signup');
  };

  return (
    <>
      <h3 className="home-title">Make decisions with our app</h3>
      <hr className="bg-white" />
      <Button className="w-100 text-center" variant="outline-light" onClick={handleStart}>
        <strong>GET STARTED!</strong>
      </Button>
      <div className="w-100 text-center mt-4 text-white">
        Have you ever visited our site?{' '}
        <Link className="text-white" to="/login">
          <strong>WELCOME BACK!</strong>
        </Link>
      </div>
    </>
  );
};

export default Start;
