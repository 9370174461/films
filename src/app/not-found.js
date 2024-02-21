import React from 'react';

const Custom404 = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-white" style={{ height: '100vh' }}>
      <h1 className="text-center mb-4" style={{ fontSize: '3rem' }}>Oops!</h1>
      <h2 className="text-center mb-4">404 - Page Not Found</h2>
      <p className="text-center mb-4" style={{ fontSize: '1.2rem' }}>Sorry, the page you are looking for does not exist.</p>
      
    </div>
  );
};

export default Custom404;
