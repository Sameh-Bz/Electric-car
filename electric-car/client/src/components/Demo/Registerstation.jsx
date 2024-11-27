import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import emailjs from 'emailjs-com';

const Registerstation = () => {
  const [firstNamemanager, setFirstNamemanager] = useState('');
  const [lastNamemanager, setLastNamemanager] = useState('');
  const [cinm, setCinm] = useState('');
  const [emailstation, setEmailstation] = useState('');
  const [passwordstation, setPasswordstation] = useState('');
  const [accounts, setAccounts] = useState([]); // State to store connected accounts
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accountactive, setAccountactive] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAccounts = async () => {
      if (window.ethereum) {
        try {
          const userAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(userAccounts); // Set the accounts retrieved
          setSelectedAccount(userAccounts[0]); // Optionally select the first account by default
          setAccountactive(userAccounts[0]);
        } catch (error) {
          console.error('Error fetching accounts:', error);
          setError('Please connect to MetaMask to register.');
        }
      } else {
        setError('MetaMask not detected. Please install MetaMask.');
      }
    };

    loadAccounts(); // Load accounts when component mounts
  }, []);

  const handleEmailstationChange = (e) => {
    const value = e.target.value;
    if (value.includes('@') && !value.includes('@station.com')) {
      setEmailstation(value.split('@')[0] + '@station.com');
    } else {
      setEmailstation(value);
    }
  };


  const sendEmail = () => {
    const templateParams = {
      firstNamemanager,
      lastNamemanager,
      cinm,
      emailstation,
      selectedAccount,
      accountactive, // Add accountactive in email params
    };

    emailjs.send('service_k0fvfwn', 'template_eljqm32', templateParams, '3LnprIm49MiSrBx5p')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Error sending email:', err);
      });
  };


  const handleRegisterstation = () => {
    if (passwordstation.trim() === '') {
      alert('Password is mandatory!');
      return;
    }

    // Check if the selected account is valid
    if (selectedAccount) {
      const existingUsers = JSON.parse(localStorage.getItem('stationUsers')) || [];
      const emailExists = existingUsers.some(user => user.emailstation === emailstation);
      const accountExists = existingUsers.some(user => user.selectedAccount === selectedAccount);
      
      if (emailExists) {
        setError('Email already exists!');
        return;
      }

      if (accountExists) {
        setError('Account is already registered with another station!');
        return;
      }

      const newUser = { firstNamemanager, lastNamemanager, cinm, emailstation, passwordstation, selectedAccount };
      existingUsers.push(newUser);
      localStorage.setItem('stationUsers', JSON.stringify(existingUsers));
      localStorage.setItem('AccountStation', selectedAccount);
      
      // Envoi de l'email après enregistrement
      sendEmail();
      
      navigate('/Stationlogin');
    } else {
      setError('Please select a valid account.');
    }
  };

  const handleAccountChange = (e) => setSelectedAccount(e.target.value);

  const handleClearData = () => {
    const existingUsers = JSON.parse(localStorage.getItem('stationUsers')) || [];
    const updatedUsers = existingUsers.filter(user => user.selectedAccount !== selectedAccount);
    
    if (updatedUsers.length === existingUsers.length) {
      alert('No data found for this account.');
      return;
    }

    localStorage.setItem('stationUsers', JSON.stringify(updatedUsers));

    if (selectedAccount === localStorage.getItem('AccountStation')) {
      localStorage.removeItem('AccountStation');
    }
    
    alert('Registration data for the current account cleared!');
  };

  return (
    <div className='Register'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Managers Register</h1>
        <div className='input-box'>
          <input
            type="text"
            placeholder="First Name"
            value={firstNamemanager}
            onChange={(e) => setFirstNamemanager(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastNamemanager}
            onChange={(e) => setLastNamemanager(e.target.value)}
          />
          <input
            type="text"
            placeholder="CIN"
            value={cinm}
            onChange={(e) => setCinm(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={emailstation}
            onChange={handleEmailstationChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordstation}
            onChange={(e) => setPasswordstation(e.target.value)}
            required
          />
          <div>
            <label htmlFor="accountSelect">Choose Account: </label>
            <select id="accountSelect" value={selectedAccount} onChange={handleAccountChange}>
              <option value="">Select an account</option>
              {accounts.map(account => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div className='button'>
          <button onClick={handleRegisterstation}>Sign Up</button>
          <button type="button" onClick={handleClearData}>Clear Registration Data</button>
        </div>
      </form>
      <LogoutButtonsAuthentif /> 
    </div>
  );
};

export default Registerstation;
