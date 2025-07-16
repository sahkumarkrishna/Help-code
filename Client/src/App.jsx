import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import HelpCode from './components/HelpCode';
import Settings from './components/Settings';
import NotFound from '../PageNot'; // ✅ Make sure this path is correct

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path='/helpcode'
        element={
          <PrivateRoute>
            <HelpCode />
          </PrivateRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* 404 Not Found Route */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
