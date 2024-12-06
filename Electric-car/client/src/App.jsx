import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EthProvider } from './contexts/EthContext';
import Loginclient from './components/Demo/Loginclient';
import Stationlogin from './components/Demo/Stationlogin';
import Register from './components/Demo/Register';
import Registerstation from './components/Demo/Registerstation';
import Admin from './components/Demo/Admin';
import Demo from './components/Demo/index';
import Station from './components/Demo/Station';
import './styles.css';
import Authentif from './components/Authentif';
import ListeCars from './components/Demo/listecars';
import ListeCarsClient from './components/Demo/listecarsclient';
import Chargebattrie from './components/Demo/Chargebattrie';
import ListeStations from './components/Demo/listestations';
import ListeStationsManager from './components/Demo/listestationsmanager';
import Choix from './components/Demo/Choix';
import Info from './components/Demo/Info';
import Home from './components/Demo/Home';


function App() {
  return (
    <EthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Authentif" element={<Authentif />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/choix" element={<Choix />} />  
          <Route path="/loginclient" element={<Loginclient />} />
          <Route path="/register" element={<Register />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/listecars" element={<ListeCars />} />
          <Route path="/listecarsclient" element={<ListeCarsClient />} />
          <Route path="/Chargebattrie" element={<Chargebattrie />} />
          <Route path="/stationlogin" element={<Stationlogin />} />
          <Route path="/registerstation" element={<Registerstation />} />
          <Route path="/Station" element={<Station />} /> 
          <Route path="/listestationsmanager" element={<ListeStationsManager />} />
          <Route path="/listestations" element={<ListeStations />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </EthProvider>
  );
}

export default App;
