import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButtons.css';  // Importez votre fichier CSS pour les styles

const LogoutButtonsAuthentif = () => {
    const navigate = useNavigate();
    const handleLogoutToAuthentif = () => {
        // Logique pour gérer la déconnexion vers Authentif
        navigate("/Authentif");  // Rediriger vers la page Authentif
    };
    const handleLogoutToHome = () => {
        // Logique pour gérer la déconnexion vers Home
        navigate("/Home");  // Rediriger vers la page Home
    };

    return (
        <div className="logout-buttons">
            <button className="logout-button" onClick={handleLogoutToAuthentif}>
                Logout to Authentif
            </button>
            <button className="logout-button" onClick={handleLogoutToHome}>
                Logout to Home
            </button>
        </div>
    );
};

export default LogoutButtonsAuthentif;
