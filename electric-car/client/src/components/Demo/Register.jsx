import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import emailjs from 'emailjs-com';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cin, setCin] = useState('');
  const [emailclient, setEmailclient] = useState('');
  const [passwordclient, setPasswordclient] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accountactive, setAccountactive] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    const loadAccounts = async () => {
      if (window.ethereum) {
        try {
          const userAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(userAccounts);
          setSelectedAccount(userAccounts[0]);
          setAccountactive(userAccounts[0]);
        } catch (error) {
          console.error('Error fetching accounts:', error);
          setError('Please connect to MetaMask to register.');
        }
      } else {
        setError('MetaMask not detected. Please install MetaMask.');
      }
    };
    loadAccounts();
  }, []);

  const handleEmailclientChange = (e) => {
    const value = e.target.value;
    if (value.includes('@') && !value.includes('@client.com')) {
      setEmailclient(value.split('@')[0] + '@client.com');
    } else {
      setEmailclient(value);
    }
  };

  const sendEmail = () => {
    const templateParams = {
      firstName,
      lastName,
      cin,
      emailclient,
      selectedAccount,
      accountactive, // Add accountactive in email params
    };

    emailjs.send('service_k0fvfwn', 'template_exrjngv', templateParams, '3LnprIm49MiSrBx5p')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Error sending email:', err);
      });
  };

  const handleRegister = () => {
    if (passwordclient.trim() === '') {
      alert('Password is mandatory!');
      return;
    }

    if (selectedAccount) {
      const existingUsers = JSON.parse(localStorage.getItem('clientUsers')) || [];
      const emailExists = existingUsers.some(user => user.emailclient === emailclient);
      const accountExists = existingUsers.some(user => user.selectedAccount === selectedAccount);

      if (emailExists) {
        setError('Email already exists!');
        return;
      }

      if (accountExists) {
        setError('Account is already registered with another client!');
        return;
      }

      const newUser = { firstName, lastName, cin, emailclient, passwordclient, selectedAccount };
      existingUsers.push(newUser);
      localStorage.setItem('clientUsers', JSON.stringify(existingUsers));
      localStorage.setItem('AccountClient', selectedAccount);

      // Envoi de l'email après enregistrement
      sendEmail();

      navigate('/Loginclient');
    } else {
      setError('Please select a valid account.');
    }
  };

  const handleAccountChange = (e) => setSelectedAccount(e.target.value);

  const handleClearData = () => {
    const existingUsers = JSON.parse(localStorage.getItem('clientUsers')) || [];
    const updatedUsers = existingUsers.filter(user => user.selectedAccount !== selectedAccount);

    if (updatedUsers.length === existingUsers.length) {
      alert('No data found for this account.');
      return;
    }

    localStorage.setItem('clientUsers', JSON.stringify(updatedUsers));

    if (selectedAccount === localStorage.getItem('AccountClient')) {
      localStorage.removeItem('AccountClient');
    }

    alert('Registration data for the current account cleared!');
  };

  return (
    <div className='Register'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Clients Register</h1>
        <div className='input-box'>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="CIN"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={emailclient}
            onChange={handleEmailclientChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordclient}
            onChange={(e) => setPasswordclient(e.target.value)}
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
          <button onClick={handleRegister}>Sign Up</button>
          <button type="button" onClick={handleClearData}>Clear Registration Data</button>
        </div>
      </form>
      <LogoutButtonsAuthentif /> 
    </div>
  );
};

export default Register;
