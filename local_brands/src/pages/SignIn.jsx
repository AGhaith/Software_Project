import React from "react";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fcfcfc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
          Sign In Page
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          This page is under construction
        </p>
        <Link
          to="/"
          style={{
            color: '#ff8500',
            fontWeight: '600',
            fontSize: '18px',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.target.style.textDecoration = 'none'}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
