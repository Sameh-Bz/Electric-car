import LogoutButtonsAuthentif from './LogoutButtonsAuthentif';
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import './liste.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function ListeCars() {
  const navigate = useNavigate();
  const { state: { contract, accounts } } = useEth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carList = await contract.methods.listeCars().call({ from: accounts[0] });
        setCars(carList);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [contract, accounts]);



  const goadmin = (event) => {
    event.preventDefault();
    navigate('/Admin'); 
  };

  return (
    <div className="list-wrapper">
      <h1>list Cars</h1>
      {cars.length === 0 ? (
        <p>No cars registered yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>  Number  of Car  </th>
              <th>  Brand  of Car  </th>
              <th>  Model of Car  </th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <td>{car.matricule}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
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

export default ListeCars;
