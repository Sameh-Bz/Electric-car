// Importer le composant LogoutButtonsClient
import LogoutButtonsClient from './LogoutButtonsClient'; 
import { useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import './listeacount.css';
import { useNavigate, useLocation } from "react-router-dom";

function ListeCarsClient() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { state: { contract, accounts } } = useEth();
  const [cars, setCars] = useState([]); 
  const [Temperature, setTemperature] = useState(0); 
  const [Humidity, setHumidity] = useState(0);
  const [Latitude, setLatitude] = useState(null);  // Ajouter le state pour Latitude
  const [Longitude, setLongitude] = useState(null);  // Ajouter le state pour Longitude
  const [CurrentCapacity, setCurrentCapacity] = useState('');
  const AccountClient = location.state?.AccountClient || ""; 

  // Fonction pour récupérer les données du capteur depuis l'API Flask
  const fetchSensorData = useCallback(async () => {
    const startTime = Date.now(); 
    try {
      const response = await fetch('http://192.168.43.50:5000/sensor-data');
      if (!response.ok) {
        throw new Error("Failed to fetch sensor data");
      }
      const data = await response.json();
      setTemperature(data.Temperature);
      setHumidity(data.Humidity);
      setCurrentCapacity(data.CurrentCapacity);
      setLatitude(data.Latitude);  // Récupérer la latitude
      setLongitude(data.Longitude);  // Récupérer la longitude
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    } finally {
      const endTime = Date.now(); // Fin du chronomètre
      console.log(`Fetch sensor data took ${endTime - startTime} ms`);
    }
  }, []);

  const searchCarByAccount = useCallback(async () => {
    try {
      if (AccountClient) {
        const carList = await contract.methods.getCarsByAccount(AccountClient).call({ from: accounts[0] });
        setCars(carList);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
    }
  }, [AccountClient, contract, accounts]); 
  
  useEffect(() => {
    searchCarByAccount();

    // Polling sensor data every 5 seconds
    const sensorInterval = setInterval(fetchSensorData, 1000);

    return () => clearInterval(sensorInterval);
  }, [fetchSensorData, searchCarByAccount]);

  const handleChargeBattery = (matricule) => {
    navigate('/Chargebattrie', { state: { matricule } }); 
  };

  const handleInfo = (matricule) => {
    navigate('/Info', { state: { matricule } });
  };

  const deleteCar = async (carmatricule) => {
    try {
      await contract.methods.deleteCarByMatricule(carmatricule).send({ from: accounts[0] });
      alert(`Car ${carmatricule} has been deleted.`);
      searchCarByAccount();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const goCars = (event) => {
    event.preventDefault();
    navigate('/Demo'); 
  };

  return (
    <div className="wrapperliste">
      <h1>List of cars per client</h1>
      <label>Account :</label>
      <input className="input" type="text" value={AccountClient} readOnly />
  
      {cars.length > 0 ? (
        <table className="table1">
          <thead>
            <tr>
              <th>Number Car</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Current Capacity</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Latitude</th>  {/* Ajouter Latitude */}
              <th>Longitude</th>  {/* Ajouter Longitude */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <td>{car.matricule}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{CurrentCapacity} Kwh</td>
                <td>{Temperature}°C</td>
                <td>{Humidity}%</td>
                <td>{Latitude}</td>  {/* Afficher la latitude */}
                <td>{Longitude}</td>  {/* Afficher la longitude */}
                <td>
                  <div className="bn">
                    <button onClick={() => handleChargeBattery(car.matricule)}>Charge the Battery</button>
                    <button onClick={() => deleteCar(car.matricule)}>Delete</button>
                    <button onClick={() => handleInfo(car.matricule)}>Infos</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        AccountClient && <p>No cars found for the account: {AccountClient}</p>
      )}
      <div className="bn">
        <button onClick={goCars}>Other Cars</button>
      </div>
      <LogoutButtonsClient />
    </div>
  );
}

export default ListeCarsClient;
