import ButtonsHome from './Demo/ButtonsHome';
import React, { useState, useEffect } from "react";
import { useEth } from "../contexts/EthContext"; // Adjust the path if necessary
import "./Authentif.css";
import { useNavigate } from 'react-router-dom';

const Authentif = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [selectedAccount, setSelectedAccount] = useState('');
    const { state } = useEth();
    const { web3, accounts = [], contract } = state; // Default accounts to an empty array if null
    const navigate = useNavigate();

    useEffect(() => {
        if (accounts && accounts.length > 0) {
            setSelectedAccount(accounts[0]); // Default to the first account
        }
    }, [accounts]);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assurez-vous que le compte sélectionné correspond au compte actif de MetaMask
        if (selectedAccount.toLowerCase() !== accounts[0].toLowerCase()) {
            setMessage("The selected account does not match the active MetaMask account.");
            return;
        }
        
        // Récupérer les utilisateurs stockés dans localStorage
        const storedClientUsers = JSON.parse(localStorage.getItem('clientUsers')) || [];
        const storedStationUsers = JSON.parse(localStorage.getItem('stationUsers')) || [];
    
        // Vérifiez si un utilisateur client correspond à l'e-mail et au mot de passe
        const matchingClientUser = storedClientUsers.find(user => user.emailclient === email && user.passwordclient === password);
        
        if (matchingClientUser) {
            localStorage.setItem('AccountClient', selectedAccount); // Changez la clé en 'AccountClient'
                
            if (selectedAccount.toLowerCase() === (matchingClientUser.selectedAccount || '').toLowerCase()) {
                navigate('/Demo');
            } else {
                setMessage("The client account does not match the active account.");
            }
            return;
        }
                
        // Vérifiez si un manager de station correspond à l'e-mail et au mot de passe
        const matchingStationUser = storedStationUsers.find(user => user.emailstation === email && user.passwordstation === password );
                
        if (matchingStationUser) {
            localStorage.setItem('AccountStation', selectedAccount);
                
            if (selectedAccount.toLowerCase() === (matchingStationUser.selectedAccount || '').toLowerCase()) {
                navigate('/Station'); // Redirigez vers la page de gestion des stations
            } else {
                setMessage("The manager account does not match the active account.");
            }
            return;
        }
                
        // Vérifiez l'accès admin via le contrat intelligent
        if (web3 && accounts && contract) {
            try {
                // Call the contract method to verify email, password, and address
                const response = await contract.methods.accessAdminPage(email, password, selectedAccount).call();
                console.log("Réponse du contrat :", response); // Debugging
        
                if (response === "Acces a la page admin autorise") {
                    setMessage("Authentication successful! Access to the admin page authorized.");
                    
                    // Convert addresses to lowercase to ensure case-insensitive comparison
                    const adminAddress = '0x577d1AAd3F73923Dd313a1A41dDA9a3f5daCDF64'.toLowerCase();
                    const activeAccount = accounts[0].toLowerCase();
                    const selectedAddress = selectedAccount.toLowerCase();
        
                    // Check if both the selected account and active account match the admin address
                    if (selectedAddress === adminAddress && activeAccount === adminAddress) {
                        navigate('/Admin'); // Redirect to the admin page if all checks pass
                    } else {
                        setMessage("The admin account does not match the active account.");
                    }
                } else {
                    setMessage("Incorrect identifiers.");
                }
            } catch (error) {
                console.error("Erreur lors de l'appel du contrat", error);
                setMessage("Error calling contract.");
            }
        } else {
            setMessage("Web3, accounts or contract not available.");
        }
        
               
    };
    

    const handleChoixClick = (event) => {
        event.preventDefault();
        navigate('/Choix');
    };

    const handleAccountChange = (event) => {
        setSelectedAccount(event.target.value);
    };

    return (
        <div className="Authentif-container">
            <form className="Authentif-form" onSubmit={handleSubmit}>
                <h2>Authentication</h2>
                <label>E-mail:</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <div>
                    <label htmlFor="accountSelect">Choose Account: </label>
                    <select id="accountSelect" value={selectedAccount} onChange={handleAccountChange}>
                        {accounts && accounts.length > 0 ? (
                            accounts.map((account, index) => (
                                <option key={index} value={account}>
                                    {account}
                                </option>
                            ))
                        ) : (
                            <option>No accounts available</option>
                        )}
                    </select>
                </div>

                <button type="submit">Sign in</button>
                {message && <p className="message">{message}</p>}

                <button onClick={handleChoixClick}>Registration</button>
            </form>
            <ButtonsHome /> 
        </div>
    );
};

export default Authentif;