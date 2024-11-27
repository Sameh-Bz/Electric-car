import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButtons.css';  

const LogoutButtonsClient = () => {
    const navigate = useNavigate();

    const handleLogoutClient = () => {
        navigate("/loginclient");  
    };

    const handleLogoutToAuthentif = () => {
        navigate("/Authentif");  
    };

    const handleLogoutToHome = () => {
        navigate("/Home");  
    };

    return (
        <div className="logout-buttons">
            <button className="logout-button" onClick={handleLogoutClient}>
                Logout client
            </button>
            <button className="logout-button" onClick={handleLogoutToAuthentif}>
                Logout to Authentif
            </button>
            <button className="logout-button" onClick={handleLogoutToHome}>
                Logout to Home
            </button>
        </div>
    );
};

export default LogoutButtonsClient;
