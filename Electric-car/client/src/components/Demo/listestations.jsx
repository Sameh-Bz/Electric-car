import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import './liste.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation


function ListeStations() {
  const goadmin = (event) => {
        event.preventDefault();
        navigate('/Admin'); 
    };
  const navigate = useNavigate();
  const { state: { contract, accounts } } = useEth();
  const [stations, setStations] = useState([]);
  

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationList = await contract.methods.listeStations().call({ from: accounts[0] });
        setStations(stationList);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    

    fetchStations();
  }, [contract, accounts]);

  return (
    <div className="list-wrapper">
      <h1>list Stations</h1>
      {stations.length === 0 ? (
        <p>No stations registered yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name Station</th>
              <th>Station Position</th>
              <th>Number of Charging</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, Station) => (
              <tr key={Station}>
                <td>{station.name}</td>
                <td>{station.posstation}</td>
                <td>{station.nbrborne}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      )}

      <div className="bn">
        <button onClick={goadmin}>Admin</button>
      </div>
      <LogoutButtonsAuthentif />
    </div>
  );
}

export default ListeStations;
