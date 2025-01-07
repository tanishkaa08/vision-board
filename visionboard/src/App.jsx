import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md">
        <Header />
      </header>
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
      <footer className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-inner">
        <Footer />
      </footer>
    </div>
  ) : null;
}

export default App;
