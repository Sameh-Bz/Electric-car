import LogoutButtonsClient from './LogoutButtonsClient'; // Assurez-vous que le chemin d'importation est correct
import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { MdPlaylistAddCheck } from "react-icons/md";
import './index.css';
import { useNavigate } from "react-router-dom";

function Demo() {
  const { state: { contract } } = useEth(); 
  const [matriculeInput, setMatriculeInput] = useState("");
  const [selectedAccountInput, setSelectedAccountInput] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  
  // Define the brands and their corresponding models
  const brands = [
    { name: 'Tesla', models: ['Model S', 'Model 3', 'Model X'] },
    { name: 'BYD', models: ['Han EV', 'Tang EV', 'Seal'] },
    { name: 'NIO', models: ['ES8', 'ES6', 'EC6'] },
    { name: 'BMW', models: ['i3', 'i4', 'iX'] },
    { name: 'Volkswagen', models: ['ID.3', 'ID.4', 'ID.Buzz'] },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const accountClient = localStorage.getItem('AccountClient');
    if (accountClient) {
      setSelectedAccountInput(accountClient);
    } else {
      alert('No account found in localStorage');
    }
  }, []);

  const addCar = async e => {
    e.preventDefault();
    if (selectedAccountInput === "" || matriculeInput === "" || selectedBrand === "" ||selectedModel === "" ) {
      alert("Please enter all car details.");
      return;
    }

    try {
      // Here you might want to include the selected model in the matricule or handle it differently
      await contract.methods.addCar(matriculeInput ,selectedBrand, selectedModel,).send({ from: selectedAccountInput });
      alert("Car added successfully!");
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const goToListCars = () => {
    navigate("/listecarsclient", { state: { AccountClient: selectedAccountInput } });
  };

  // Function to handle brand selection
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel(''); // Reset the selected model when brand changes
  };

  // Get the models based on the selected brand
  const getModelsByBrand = () => {
    const brandObj = brands.find(b => b.name === selectedBrand);
    return brandObj ? brandObj.models : [];
  };

  return (
    <div className="wrapper">
      <MdPlaylistAddCheck className="icon" />
      <h1>Add a Car</h1>

      <form onSubmit={addCar}>
        <div className="labels">
          <label>Account Client:</label>
          <input
            className="input"
            type="text"
            placeholder="Account"
            value={selectedAccountInput}
            onChange={(e) => setSelectedAccountInput(e.target.value)}
            readOnly
          />

          <label>Brand:</label>
          <select className="select brand-select" value={selectedBrand} onChange={handleBrandChange}>
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                  <option key={brand.name} value={brand.name}>{brand.name}</option>
              ))}
          </select>

          <label>Model:</label>
          <select
              className="select model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
          >
              <option value="">Select Model</option>
              {getModelsByBrand().map((model) => (
                  <option key={model} value={model}>{model}</option>
              ))}
          </select>


          <label>Number Car:</label>
          <input
            className="input"
            type="text"
            value={matriculeInput}
            onChange={(e) => setMatriculeInput(e.target.value)}
          />
          <div className="bn">
            <button type="submit">Add a Car</button>
            <button type="button" onClick={goToListCars}>List Cars</button>
          </div> 
        </div> 
      </form>
      <LogoutButtonsClient />  {/* Ajoutez ici les boutons de déconnexion */}
    </div>
  );
}

export default Demo;
