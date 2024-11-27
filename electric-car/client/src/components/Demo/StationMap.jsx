import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useEth from '../../contexts/EthContext/useEth';


// Marker icons
const redMarkerIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -35],
});

const blueMarkerIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -35],
});

function MapStations() {
    const { state: { contract, accounts } } = useEth();
    const [stations, setStations] = useState([]);
    const [cars, setCars] = useState([]);
    const [sensorPosition, setSensorPosition] = useState(null); // State for sensor position

    // Fetching the list of stations and cars on component mount
    useEffect(() => {
        const fetchStationsAndCars = async () => {
            try {
                // Fetching stations
                const stationList = await contract.methods.listeStations().call({ from: accounts[0] });
                const stationsWithCoordinates = stationList.map(station => {
                    const [lat, lng] = station.posstation.split(', ').map(coord => parseFloat(coord.split(': ')[1]));
                    return {
                        name: station.name,
                        position: [lat, lng],
                    };
                });
                setStations(stationsWithCoordinates);

                // Fetching cars (assuming there is a method to get all cars)
                const carList = await contract.methods.listeVoitures().call({ from: accounts[0] });
                const carsWithCoordinates = carList.map(car => {
                    const [lat, lng] = car.position.split(', ').map(coord => parseFloat(coord.split(': ')[1]));
                    return {
                        name: car.name,
                        position: [lat, lng],
                    };
                });
                setCars(carsWithCoordinates);

            } catch (error) {
                console.error("Error fetching stations or cars:", error);
            }
        };

        fetchStationsAndCars();
    }, [contract, accounts]);

    // Fetch GPS coordinates from sensor
    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('http://192.168.43.50:5000/sensor-data');
                const data = await response.json();
                if (data.Latitude && data.Longitude) {
                    setSensorPosition([data.Latitude, data.Longitude]);
                }
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        fetchSensorData();
        const interval = setInterval(fetchSensorData, 1000); // Refresh GPS data every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Stations and Cars on Map</h1>
            <MapContainer center={[33.8869, 9.5375]} zoom={7} style={{ height: "420px", width: "99.5%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {stations.map((station, index) => (
                    <Marker key={`station-${index}`} position={station.position} icon={redMarkerIcon}>
                        <Popup>
                            {station.name}
                        </Popup>
                    </Marker>
                ))}
                {cars.map((car, index) => (
                    <Marker key={`car-${index}`} position={car.position} icon={redMarkerIcon}>
                        <Popup>
                            {car.name}
                        </Popup>
                    </Marker>
                ))}
                {sensorPosition && (
                    <Marker position={sensorPosition} icon={blueMarkerIcon}>
                        <Popup>Sensor Position</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}

export default MapStations;
