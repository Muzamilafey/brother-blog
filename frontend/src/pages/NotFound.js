import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#4285f4' }}>404</h1>
      <p style={{ fontSize: '20px', margin: '20px 0' }}>
        Page Not Found
      </p>
      <Link to="/" style={{
        textDecoration: 'none',
        color: '#fff',
        background: '#4285f4',
        padding: '10px 20px',
        borderRadius: '6px'
      }}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
