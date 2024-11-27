import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import React from 'react';
import './Admin.css'; 
import { GrUserAdmin } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleAddClientClick = (event) => {
    event.preventDefault();
    navigate('/Register'); 
  };

  const handleAddManagerClick = (event) => {
    event.preventDefault();
    navigate('/Registerstation'); 
  };

  const handlelistcarClick = (event) => {
    event.preventDefault();
    navigate('/listecars'); 
  };

  const handleliststationClick = (event) => {
    event.preventDefault();
    navigate('/listestations'); 
  };

  return (
    <div className='Admin'> 
      <form action="">
        <h1>Admin</h1>
        <GrUserAdmin className='icon' />
        <div className='button'>
          <button onClick={handlelistcarClick}>list Cars</button>
          <button onClick={handleliststationClick}>list Stations</button>
          <button onClick={handleAddClientClick}>Add a Client</button>
          <button onClick={handleAddManagerClick}>Add a Manager</button>
        </div>
      </form>
      <LogoutButtonsAuthentif /> 
    </div>
  );
}

export default Admin;
