import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

const StationLogin = () => {
  const [emailstation, setEmailstation] = useState('');
  const [passwordstation, setPasswordstation] = useState('');
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

  const handleEmailstationChange = (e) => {
    const value = e.target.value;
    if (value.includes('@') && !value.includes('@station.com')) {
      setEmailstation(value.split('@')[0] + '@station.com');
    } else {
      setEmailstation(value);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem('stationUsers')) || [];

    const userFound = registeredUsers.find(
      user => user.emailstation === emailstation &&
              user.passwordstation === passwordstation &&
              user.selectedAccount === activeAccount
    );

    if (userFound) {
      localStorage.setItem('AccountStation', userFound.selectedAccount);
      navigate('/Station');
    } else {
      setError('Email, password, or account is incorrect');
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <h1>Login Manager</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={emailstation}
            onChange={handleEmailstationChange}
            required
          />
          <FaUser className='icon' />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={passwordstation}
            onChange={(e) => setPasswordstation(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>

        {error && <p className='error-message'>{error}</p>} {/* Display the error message here */}

        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember me</label>
          <b href="#">Forgot password?</b>
        </div>
        <div className='button'>
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate('/Registerstation')}>Managers Register</button>
        </div>
        <LogoutButtonsAuthentif /> 
      </form>
    </div>
  );
};

export default StationLogin;
