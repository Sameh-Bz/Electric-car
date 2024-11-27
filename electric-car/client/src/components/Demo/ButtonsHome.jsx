import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonsHome.css';  

const ButtonsHome = () => {
    const navigate = useNavigate();
   
    const handlegoToHome = () => {
        navigate("/Home");  
    };

    return (
        <div className="logout1-buttons">
            
            <button className="logout1-button" onClick={handlegoToHome}>
                Go to Home
            </button>
        </div>
    );
};

export default ButtonsHome;
