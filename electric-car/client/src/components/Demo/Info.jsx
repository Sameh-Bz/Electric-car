import LogoutButtonsClient from './LogoutButtonsClient'; 
import { useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { useNavigate, useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';  // Importer le diagramme circulaire
import 'react-circular-progressbar/dist/styles.css';  // Styles du diagramme
import './Info.css';


function Info() {

    const { state: { contract, accounts } } = useEth();
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { matricule } = location.state || {};  // Récupérer le numéro de la voiture depuis l'état passé
  
    const [car, setCar] = useState(null);
    const [MaxCapacity, setMaxCapacity] = useState(null);  // Capacité maximale
    const [MaxAutonomy, setMaxAutonomy] = useState(null);  // Autonomie maximale
    const [CalculatedAutonomy, setCalculatedAutonomy] = useState(null);  // Autonomie calculée
    const [CapacityPercentage, setCapacityPercentage] = useState(0);  // Pourcentage de capacité
    const [Co2Emissions, setCo2Emissions] = useState(0);  // Emissions de CO2
    const [ChargingTime, setChargingTime] = useState(null);
    const ChargerPower = 11;  // Charger power in kW
    
    const [Temperature, setTemperature] = useState(0); 
    const [Humidity, setHumidity] = useState(0);
    const [CurrentCapacity, setCurrentCapacity] = useState('');
    

    const fetchSensorData = useCallback(async () => {
        const startTime = Date.now(); 
        try {

          const cars = await contract.methods.listeCars().call({ from: accounts[0] });
          const foundCar = cars.find(car => car.matricule === matricule);
          setCar(foundCar);

          const response = await fetch('http://192.168.43.50:5000/sensor-data');
          if (!response.ok) {
            throw new Error("Failed to fetch sensor data");
          }
          const data = await response.json();
          setTemperature(data.Temperature);
          setHumidity(data.Humidity);
          setCurrentCapacity(data.CurrentCapacity);

          let Co2PerKm = 0;  // Initialiser à 0 par défaut

        // Gestion des différentes marques et modèles
        if (foundCar.brand === 'Tesla') {
          Co2PerKm = 115;  // 115 g/km pour Tesla
          if (foundCar.model === 'Model S') {
            setMaxCapacity(100);  // 100 Kwh pour Tesla Model S
            setMaxAutonomy(637);  // 637 Km d'autonomie pour Tesla Model S
          } else if (foundCar.model === 'Model 3') {
            setMaxCapacity(82);  // 82 Kwh pour Tesla Model 3
            setMaxAutonomy(602);  // 602 Km d'autonomie pour Tesla Model 3
          } else if (foundCar.model === 'Model X') {
            setMaxCapacity(100);  // 100 Kwh pour Tesla Model x
            setMaxAutonomy(560);  // 560 Km d'autonomie pour Tesla Model x
          }
        } else if (foundCar.brand === 'BYD') {
          Co2PerKm = 110;  // 110 g/km pour BYD
          if (foundCar.model === 'Han EV') {
            setMaxCapacity(85.4);  // 85.4 Kwh pour BYD Han EV
            setMaxAutonomy(605);  // 605 Km d'autonomie pour BYD Han EV
          } else if (foundCar.model === 'Tang EV') {
            setMaxCapacity(86.4);  // 86.4 Kwh pour BYD Tang EV
            setMaxAutonomy(565);  // 565 Km d'autonomie pour BYD Tang EV
          } else if (foundCar.model === 'Seal') {
            setMaxCapacity(82.5);  // 82.5 Kwh pour BYD Seal
            setMaxAutonomy(700);  // 700 Km d'autonomie pour BYD Seal
          }
        } else if (foundCar.brand === 'NIO') {
          Co2PerKm = 95;  // 95 g/km pour NIO
          if (foundCar.model === 'ES8') {
            setMaxCapacity(100);  // 100 Kwh pour NIO ES8
            setMaxAutonomy(580);  // 580 Km d'autonomie pour NIO ES8
          } else if (foundCar.model === 'ES6') {
            setMaxCapacity(100);  // 100 Kwh pour NIO ES6
            setMaxAutonomy(610);  // 610 Km d'autonomie pour NIO ES6
          } else if (foundCar.model === 'EC6') {
            setMaxCapacity(100);  // 100 Kwh pour NIO EC6
            setMaxAutonomy(615);  // 615 Km d'autonomie pour NIO EC6
          }
        } else if (foundCar.brand === 'BMW') {
          Co2PerKm = 120;  // 120 g/km pour BMW
          if (foundCar.model === 'i3') {
            setMaxCapacity(42.2);  // 42.2 Kwh pour BMW i3
            setMaxAutonomy(310);  // 310 Km d'autonomie pour BMW i3
          } else if (foundCar.model === 'i4') {
            setMaxCapacity(83.9);  // 83.9 Kwh pour BMW i4
            setMaxAutonomy(590);  // 590 Km d'autonomie pour BMW i4
          } else if (foundCar.model === 'iX') {
            setMaxCapacity(111.5);  // 111.5 Kwh pour BMW ix
            setMaxAutonomy(630);  // 630 Km d'autonomie pour BMW ix
          }
        } else if (foundCar.brand === 'Volkswagen') {
          Co2PerKm = 130;  // 130 g/km pour Volkswagen
          if (foundCar.model === 'ID.3') {
            setMaxCapacity(77);  // 77 Kwh pour Volkswagen ID.3
            setMaxAutonomy(550);  // 550 Km d'autonomie pour Volkswagen ID.3
          } else if (foundCar.model === 'ID.4') {
            setMaxCapacity(77);  // 77 Kwh pour Volkswagen ID.4
            setMaxAutonomy(520);  // 520 Km d'autonomie pour Volkswagen ID.4
          } else if (foundCar.model === 'ID.Buzz') {
            setMaxCapacity(77);  // 77 Kwh pour Volkswagen ID.Buzz
            setMaxAutonomy(423);  // 423 Km d'autonomie pour Volkswagen ID.Buzz
          }
        }

        // Calculer les émissions de CO2 en fonction de l'autonomie
        if (CalculatedAutonomy && Co2PerKm) {
          const totalCo2 = (Co2PerKm * CalculatedAutonomy) / 1000;  // Convertir en kg
          setCo2Emissions(totalCo2.toFixed(2));  // Stocker les émissions calculées
        }

        } catch (error) {
          console.error("Error fetching sensor data:", error);
        } finally {
          const endTime = Date.now(); // Fin du chronomètre
          console.log(`Fetch sensor data took ${endTime - startTime} ms`);
        }
    }, [CalculatedAutonomy, accounts, contract.methods, matricule]);

    
    useEffect(() => {
        if (matricule) {
            fetchSensorData();
        }
        
        // Polling sensor data every 5 seconds
        const sensorInterval = setInterval(fetchSensorData, 1000);

        return () => clearInterval(sensorInterval);
    }, [fetchSensorData, matricule]);


    // Calcul de l'autonomie de la batterie
    useEffect(() => {
        if (CurrentCapacity && MaxCapacity && MaxAutonomy) {
        const autonomy = (CurrentCapacity / MaxCapacity) * MaxAutonomy;
        setCalculatedAutonomy(autonomy.toFixed(2));  // Formatage à 2 décimales

        // Calcul du pourcentage de capacité actuelle
        const percentage = (CurrentCapacity / MaxCapacity) * 100;
        setCapacityPercentage(percentage.toFixed(2));  // Formatage à 2 décimales
        
        // Calculate capacity to recharge
        const CapacityToRecharge = MaxCapacity - CurrentCapacity;

        // Calculate charging time
        if (CapacityToRecharge > 0) {  // Ensure there's capacity to recharge
            const fT = Temperature <= 25 ? 1 : 1.3;  // Determine fT based on temperature
            const chargingTime = (CapacityToRecharge / ChargerPower) * fT;  // Charging time calculation
            setChargingTime(chargingTime.toFixed(2));  // Store charging time formatted to 2 decimals
        } else {
            setChargingTime(0);  // No charging needed
        }
        }

        
    },[CurrentCapacity, MaxCapacity, MaxAutonomy, Temperature]);
        
  // Function to navigate to the list of cars for the active account
  const handleNavigateToList = () => {
    navigate("/listecarsclient", { state: { AccountClient: car.owner } });  // Pass the active account to ListeCarsClient
  };


  return (
    <div className="info-container">
      {car ? (
        <div className="car-info-wrapper">
          <div className="car-info-details">
            <h2>Car information</h2>
            <p><strong>Number Car :</strong> {car.matricule}</p>
            <p><strong>Brand :</strong> {car.brand}</p>
            <p><strong>Model :</strong> {car.model}</p>
            <p><strong>Current Capacity :</strong> {CurrentCapacity} kWh</p>
            <p><strong>Température :</strong> {Temperature} °C</p>
            <p><strong>Humidité :</strong> {Humidity} %</p>
            <p><strong>Autonomy :</strong> {CalculatedAutonomy} km</p>
            <p><strong>Time to Charge:</strong> {ChargingTime } hours </p>
            <h2>The CO2 emissions if the car is diesel.</h2>
            <p><strong>CO2 Emissions :</strong> {Co2Emissions} kg</p>
          </div>
          <div className="vertical-line" />
          <div className="car-info-diagram">
            <div className="battery-percentage">
              <CircularProgressbar
                value={CapacityPercentage}
                text={`${CapacityPercentage}%`}
                styles={buildStyles({
                  pathColor: `rgb(7, 161, 7, ${CapacityPercentage / 100})`,
                  textColor: '#000',
                  trailColor: '#d6d6d6',
                })}
              />
              <p>Battery Capacity Percentage</p>
        
            </div>
            {/* Button to navigate to ListeCarsClient */}
            <button className="navigate-button" onClick={handleNavigateToList}>
              List of cars per client
            </button>

          </div>
        </div>
      ) : (
        <p>Aucune voiture trouvée.</p>
      )}
      <LogoutButtonsClient />  {/* Ajoutez ici les boutons de déconnexion */}

    </div>
  );
  
}

export default Info;