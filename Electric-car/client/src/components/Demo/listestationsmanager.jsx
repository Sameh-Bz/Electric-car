import LogoutButtonsManager from './LogoutButtonsManager'; 
import { useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import './listeacount.css';
import { useNavigate, useLocation } from "react-router-dom";

function ListeStationsManager() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { state: { contract, accounts } } = useEth();
  const [stations, setStations] = useState([]); 

  // Retrieve the manager's account from navigation props
  const AccountStation = location.state?.AccountStation || ""; 

  // Fetch stations based on the manager's account
  const searchStationsByAccount = useCallback(async () => {
    try {
      if (AccountStation) {
        const stationList = await contract.methods.getStationsByAccount(AccountStation).call({ from: accounts[0] });
        setStations(stationList);
      }
    } catch (error) {
      console.error("Error fetching stations:", error);
      setStations([]);
    }
  }, [AccountStation, contract, accounts]); 
  
  useEffect(() => {
    searchStationsByAccount(); 
  }, [searchStationsByAccount]);

  

  // Function to delete a specific station by its index
  const deleteStation = async (stationName) => {
    try {
      await contract.methods.deleteStationByName(stationName).send({ from: accounts[0] });
      alert(`Station ${stationName} has been deleted.`);
      // Refresh the station list after deletion
      searchStationsByAccount();
    } catch (error) {
      console.error("Error deleting station:", error);
    }
  };

  
  // Navigate to another station management page
  const goStations = (event) => {
    event.preventDefault();
    navigate('/Station'); 
  };

  return (
    <div className="wrapperliste">
      <h1>Stations Manager by Account</h1>
      <label>Account:</label>
      <input
        className="input"
        type="text"
        value={AccountStation}
        readOnly
      />
    
      {stations.length > 0 ? (
        <table className="table1">
          <thead>
            <tr>
              <th>Name Station</th>
              <th>Station Position</th>
              <th>Number of Charging Points</th>
              <th>Action</th> {/* New column for the action buttons */}
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr key={index}>
                <td>{station.name}</td>
                <td>{station.posstation}</td>
                <td>{station.nbrborne}</td>
                <td>
                  <div className="bn">
                   <button onClick={() => deleteStation(station.name)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        AccountStation && <p>No stations found for account: {AccountStation}</p>
      )}
      <div className="bn">
        <button onClick={goStations}>Other Stations</button>
      </div> 
      <LogoutButtonsManager />
    </div>
  );
}

export default ListeStationsManager;
