import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import React from 'react';
import './Choix.css'; 
import { GiChoice } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Choix = () => {
  const navigate = useNavigate();

  const handleRegisterlick = (event) => {
    event.preventDefault();
    navigate('/Register'); 
  };

  const handleRegisterstationClick = (event) => {
    event.preventDefault();
    navigate('/Registerstation'); 
 
  }

  return (
    <div className='Choix'> 
      <form action="">
        <h1>Choice</h1>
        <GiChoice className='icon' />
        <div className='bn'>
          <button onClick={handleRegisterlick}>Clients Register</button>
          <button onClick={handleRegisterstationClick}>Stations Register</button>
        </div>
        <LogoutButtonsAuthentif /> 
      </form>
    </div>
  );
}

export default Choix;