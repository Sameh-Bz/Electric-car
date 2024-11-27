import LogoutButtonsClient from './LogoutButtonsClient'; 
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { useNavigate } from "react-router-dom";
import StationMap from './StationMap'; // Import the new StationMap component
import './chargebattrie.css';

function Chargebattrie() {
  const navigate = useNavigate();
  const { state: { contract, accounts } } = useEth();
  const [stations, setStations] = useState([]);
  const [showMap, setShowMap] = useState(false); // New state to control map visibility
  const [checkedIndex, setCheckedIndex] = useState(null);

  // Fetch the list of stations and their checkbox states on component mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
        // Fetch the list of stations
        const stationList = await contract.methods.listeStations().call({ from: accounts[0] });
        
        // Assuming stationList is an array of stations with properties `name`, `posstation`, `nbrborne`
        const stationsWithStatus = stationList.map(station => ({
          ...station,
          isChecked: false // Initialize checkbox state
        }));

        setStations(stationsWithStatus);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStations();
  }, [contract, accounts]);

  // Handle checkbox change
  const handleCheckboxChange = async (station, index) => {
    try {
      if (checkedIndex !== null && checkedIndex !== index) {
        // Uncheck the previously checked station
        const prevIndex = checkedIndex;
        await contract.methods.toggleCheckbox().send({ from: accounts[0] });
        alert("Station checkbox toggled!");
        setStations(prevStations =>
          prevStations.map((st, i) =>
            i === prevIndex
              ? { ...st, nbrborne: parseInt(st.nbrborne) + 1, isChecked: false }
              : st
          )
        );
      }


      // Check or uncheck the current station
      const currentStation = stations[index];
      if (currentStation.isChecked) {
        // Uncheck the current station
        await contract.methods.toggleCheckbox().send({ from: accounts[0] });
        alert("Station checkbox toggled!");
        setStations(prevStations =>
          prevStations.map((st, i) =>
            i === index
              ? { ...st, nbrborne: parseInt(st.nbrborne) + 1, isChecked: false }
              : st
          )
        );
        setCheckedIndex(null); // No station is checked now
      } else {
        // Check the new station
        await contract.methods.toggleCheckbox().send({ from: accounts[0] });
        alert("Station checkbox toggled!");
        setStations(prevStations =>
          prevStations.map((st, i) =>
            i === index
              ? { ...st, nbrborne: parseInt(st.nbrborne) - 1, isChecked: true }
              : st
          )
        );
        setCheckedIndex(index); // Update the checked index
      }
    } catch (error) {
      console.error("Error toggling station checkbox:", error);
      alert("Transaction failed.");
    }
  };

  const goAdmin = (event) => {
    event.preventDefault();
    navigate('/Demo');
  };



  const goMapComponent = () => {
    setShowMap(true); // Show map when called
  };

  return (
    <div className="list-stations-wrapper">
      <h1>choice of charging station</h1>
      {stations.length === 0 ? (
        <p>No stations registered yet.</p>
      ) : (
        <table className="stations-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name Station</th>
              <th>Station Position</th>
              <th>Number of Charging Points</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={station.isChecked} // Use isChecked state to render checkbox
                    onChange={() => handleCheckboxChange(station, index)}
                  />
                </td>
                <td>{station.name}</td>
                <td>{station.posstation}</td>
                <td>{station.nbrborne}</td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      <div className="bn2">
        <button onClick={goMapComponent}>MapComponent</button>
        <button onClick={goAdmin}>Add a Car</button>
      </div>
      
      {showMap && <StationMap stations={stations} />} {/* Render the map when showMap is true */}
      
      <LogoutButtonsClient /> 
    </div>
  );
}

export default Chargebattrie;
