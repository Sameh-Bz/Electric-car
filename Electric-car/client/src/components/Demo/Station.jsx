import React, { useState, useEffect } from "react"; 
import LogoutButtonsManager from './LogoutButtonsManager';  
import useEth from "../../contexts/EthContext/useEth";
import { FaChargingStation } from "react-icons/fa";
import './Station.css';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [25, 25],
  iconAnchor: [12.5, 25], 
  popupAnchor: [0, -25],
});

function Station() {
  const { state: { contract } } = useEth();
  const [nameInput, setNameInput] = useState("");
  const [posstationInput, setPosstationInput] = useState("");
  const [nbrborneInput, setNbrborneInput] = useState(""); 
  const [selectedAccountInput, setSelectedAccountInput] = useState('');
  const [position, setPosition] = useState([33.8869, 9.5375]);
  const navigate = useNavigate();

  useEffect(() => {
    const accountStation = localStorage.getItem('AccountStation');
    if (accountStation) {
      setSelectedAccountInput(accountStation);
    } else {
      alert('No account found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        await contract.methods.listeStations().call();
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    fetchStations();
  }, [contract]);

  const addStation = async e => {
    e.preventDefault();
    if (selectedAccountInput === "" || nameInput === "" || posstationInput === "" || nbrborneInput === "") {
      alert("Please enter all station details.");
      return;
    }
    try {
      await contract.methods.addStation(nameInput, posstationInput, nbrborneInput).send({ from: selectedAccountInput });
      alert("Station added successfully!");
    } catch (error) {
      console.error("Error adding station:", error);
    }
  };

  const goToListStations = () => {
    navigate("/listestationsmanager", { state: { AccountStation: selectedAccountInput } });
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setPosstationInput(`Lat: ${lat}, Lng: ${lng}`);
      }
    });
    return position === null ? null : <Marker position={position} icon={markerIcon} />;
  };

  return (
    <div className="station-container">
      <div className="form-section">
        <FaChargingStation className="icon" />
        <h1>Add a Station</h1>
        <form onSubmit={addStation}>
          <div className="labels">
            <label>Account Station:</label>
            <input
              className="input"
              type="text"
              placeholder="Account"
              value={selectedAccountInput}
              onChange={(e) => setSelectedAccountInput(e.target.value)}
              readOnly
            />
            <label>Name Station:</label>
            <input
              className="input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <label>Station Position:</label>
            <input
              className="input"
              type="text"
              value={posstationInput}
              readOnly
            />
            <label>Number of Charging:</label>
            <input
              className="input"
              type="text"
              value={nbrborneInput}
              onChange={(e) => setNbrborneInput(e.target.value)}
            />
            <div className="bn1">
              <button type="submit">Add a Station</button>
              <button type="button" onClick={goToListStations}>List Stations</button>
            </div>
          </div>
        </form>
        <LogoutButtonsManager />
      </div>

      <div className="map-section">
        <MapContainer center={position} zoom={7} style={{ height: "400px", width: "95%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default Station;
