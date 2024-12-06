import time
import board
import busio
import adafruit_dht
import serial
from flask import Flask, jsonify
from flask_cors import CORS
from adafruit_ina219 import INA219

# Initialiser le capteur DHT11 sur la broche GPIO 4
dhtDevice = adafruit_dht.DHT11(board.D4)

# Ouvrir le port serie pour lire les donnees GPS
ser = serial.Serial("/dev/ttyS0", baudrate=9600, timeout=1)

# Initialisation du bus I2C pour le capteur INA219
i2c_bus = busio.I2C(board.SCL, board.SDA)
ina219 = INA219(i2c_bus, 0x40)

# Creer une instance Flask
app = Flask(__name__)
CORS(app)

# Fonction pour convertir les coordonnees GPS en degres
def convert_to_degrees(raw_value, direction):
    if raw_value == '':
        return None
    decimal_point_position = raw_value.index(".")
    degrees = int(raw_value[:decimal_point_position - 2])
    minutes = float(raw_value[decimal_point_position - 2:]) / 60.0
    decimal_degrees = degrees + minutes
    if direction == "S" or direction == "W":
        decimal_degrees = -decimal_degrees
    return decimal_degrees

# Fonction pour extraire les coordonnees GPS depuis une trame NMEA
def parse_gps(data):
    if data[0:6] == "$GPGGA":  # La trame GGA contient les donnees de position
        sdata = data.split(",")
        if sdata[2] == '':  # Si la trame ne contient pas de position
            return None, None
        latitude = convert_to_degrees(sdata[2], sdata[3])
        longitude = convert_to_degrees(sdata[4], sdata[5])
        return latitude, longitude
    return None, None

# Route pour obtenir les valeurs de temperature, d'humidite, latitude, longitude et capacite
@app.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    try:
        # Lire les donnees de temperature et d'humidite
        Temperature = dhtDevice.temperature
        Humidity = dhtDevice.humidity
        
        # Lire une trame GPS depuis le port serie
        gps_data = ser.readline().decode('ascii', errors='replace')
        latitude, longitude = parse_gps(gps_data)
        
        if latitude is None or longitude is None:
            return jsonify({'error': 'No GPS data available'}), 5000
        
        # Lire les donnees du capteur INA219
        bus_voltage = ina219.bus_voltage        # Tension du bus en volts
        current = ina219.current / 1000         # Courant en amperes (A)
        power = ina219.power * 1000            # Puissance en watts (KW)
        
        # Retourner temperature, humidite, latitude, longitude et capacite
        return jsonify({
            'Temperature': Temperature,
            'Humidity': Humidity,
            'Latitude': latitude,
            'Longitude': longitude,
            'CurrentCapacity': power
        })
    except RuntimeError as error:
        return jsonify({'error': str(error)}), 500
    except OSError:
        return jsonify({'error': 'Erreur de communication avec le capteur INA219.'}), 500

# Executer le serveur Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
