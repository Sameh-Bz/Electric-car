import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [emailclient, setEmailclient] = useState('');
  const [passwordclient, setPasswordclient] = useState('');
  const [activeAccount, setActiveAccount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveAccount = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setActiveAccount(accounts[0]); // Set the active account
        } catch (error) {
          console.error('Error fetching accounts:', error);
          setError('Please connect to MetaMask.');
        }
      } else {
        setError('MetaMask not detected. Please install MetaMask.');
      }
    };

    fetchActiveAccount(); // Load the active account when component mounts
  }, []);

  const handleEmailclientChange = (e) => {
    const value = e.target.value;
    if (value.includes('@') && !value.includes('@client.com')) {
      setEmailclient(value.split('@')[0] + '@client.com');
    } else {
      setEmailclient(value);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Retrieve all registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('clientUsers')) || [];

    // Find the user by email and password
    const userFound = registeredUsers.find(user =>
      user.emailclient === emailclient &&
      user.passwordclient === passwordclient &&
      user.selectedAccount === activeAccount
    );

    if (userFound) {
      // Store the selected account in localStorage
      localStorage.setItem('AccountClient', userFound.selectedAccount);
      navigate('/Demo'); // Navigate to the index page
    } else {
      setError('Email, password, or account is incorrect');
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <h1>Login Client</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={emailclient}
            onChange={handleEmailclientChange}
            required
          />
          <FaUser className='icon' />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={passwordclient}
            onChange={(e) => setPasswordclient(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>

        {error && <p className='error-message'>{error}</p>}

        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember me</label>
          <b href="#">Forgot password?</b>
        </div>
        <div className='button'>
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate('/Register')}>Clients Register</button>
        </div>
      </form>
      <LogoutButtonsAuthentif /> 
    </div>
  );
};

export default Login;
