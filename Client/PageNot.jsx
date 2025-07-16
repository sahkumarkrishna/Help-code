import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-4">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
