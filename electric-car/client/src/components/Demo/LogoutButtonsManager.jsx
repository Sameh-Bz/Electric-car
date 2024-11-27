import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButtons.css';  // Importez votre fichier CSS pour les styles

const LogoutButtonsManager = () => {
    const navigate = useNavigate();
    const handleLogoutManager = () => {
        // Logique pour gérer la déconnexion du client
        navigate("/Stationlogin");  // Rediriger vers la page de connexion
    };
    const handleLogoutToAuthentif = () => {
        // Logique pour gérer la déconnexion vers Authentif
        navigate("/Authentif");  // Rediriger vers la page Authentif
    };
    const handleLogoutToHome = () => {
        // Logique pour gérer la déconnexion vers Home
        navigate("/Home");  // Rediriger vers la page Home
    };

    return (
        <div className="logout1-buttons">
            <button className="logout1-button" onClick={handleLogoutManager}>
                Logout Manager
            </button>
            <button className="logout1-button" onClick={handleLogoutToAuthentif}>
                Logout to Authentif
            </button>
            <button className="logout1-button" onClick={handleLogoutToHome}>
                Logout to Home
            </button>
        </div>
    );
};

export default LogoutButtonsManager;
