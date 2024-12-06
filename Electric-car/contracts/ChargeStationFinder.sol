// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ChargeStationFinder {

 
  string  adminEmail = "sameh@gmail.com"; 
  bytes32  adminPasswordHash = keccak256(abi.encodePacked("123456789"));
  address adminAdresse = 0x577d1AAd3F73923Dd313a1A41dDA9a3f5daCDF64;

  struct Car {
    string matricule;
    string brand;   // Nouveau champ pour la marque
    string model;   // Nouveau champ pour le modèle
    address owner;
  }

  struct Station {
    string name;
    string posstation;
    uint256 nbrborne;
    address owner;
  }

  Car[] public cars;
  Station[] public stations;
  mapping (string => bool) public CarExist;
  mapping (string => bool) public StationExist;
  address public owner;
  mapping(address => bool) public accountChecked;
  modifier onlyOwner() {
    require(msg.sender == owner, "Unauthorized access");
    _;
  }

  constructor() {
    owner = msg.sender;
  }


  // FUNCTION DE VERIFICATION D'ADMIN
  function authenticate(string memory _email, string memory _password, address _address) public view returns (bool) {
    return (keccak256(abi.encodePacked(_email)) == keccak256(abi.encodePacked(adminEmail)) &&
     keccak256(abi.encodePacked(_password)) == adminPasswordHash && _address == adminAdresse);
  }

  function accessAdminPage(string memory _email, string memory _password , address _address) public view returns (string memory) {
    bool isEmailAndPasswordValid = (keccak256(abi.encodePacked(_email)) == keccak256(abi.encodePacked(adminEmail)) && 
                                    keccak256(abi.encodePacked(_password)) == adminPasswordHash &&  _address == adminAdresse);
    if (isEmailAndPasswordValid) {
        return "Acces a la page admin autorise";
    } else {
        return "Identifiants incorrects";
    }
  }

  // CAR FUNCTIONS

  function addCar(string memory _matricule, string memory _brand, string memory _model) public {
    require(!CarExist[_matricule], "Error: Car already exists");
    Car memory newCar = Car({ matricule: _matricule, brand: _brand, model: _model, owner: msg.sender });
    cars.push(newCar);
    CarExist[_matricule] = true;
  }

  function listeCars() public view returns (Car[] memory) {
    return cars;
  }

  function getCarsByAccount(address _account) public view returns (Car[] memory) {
    uint256 resultCount = 0;
    for (uint i = 0; i < cars.length; i++) {
      if (cars[i].owner == _account) {
        resultCount++;
      }
    }
    Car[] memory result = new Car[](resultCount);
    uint256 index = 0;
    for (uint i = 0; i < cars.length; i++) {
      if (cars[i].owner == _account) {
        result[index] = cars[i];
        index++;
      }
    }
    return result;
  }

  function deleteCarByMatricule(string memory _matricule) public {
    require(CarExist[_matricule], "Error: Car does not exist");
    for (uint i = 0; i < cars.length; i++) {
      if (keccak256(abi.encodePacked(cars[i].matricule)) == keccak256(abi.encodePacked(_matricule)) && cars[i].owner == msg.sender) {
        cars[i] = cars[cars.length - 1]; // Move the last element into the place of the deleted element
        cars.pop(); // Remove the last element
        CarExist[_matricule] = false; // Mark the car as deleted
        break;
      }
    }
  }

  // STATION FUNCTIONS

  function addStation(string memory _name, string memory _posstation, uint256 _nbrborne) public {
    require(!StationExist[_name], "Error: Station already exists");
    Station memory newStation = Station({ name: _name, posstation: _posstation, nbrborne: _nbrborne, owner: msg.sender });
    stations.push(newStation);
    StationExist[_name] = true;
  }

  function listeStations() public view returns (Station[] memory) {
    return stations;
  }

  function getStationsByAccount(address _account) public view returns (Station[] memory) {
    uint256 resultCount = 0;
    for (uint i = 0; i < stations.length; i++) {
      if (stations[i].owner == _account) {
        resultCount++;
      }
    }
    Station[] memory result = new Station[](resultCount);
    uint256 index = 0;
    for (uint i = 0; i < stations.length; i++) {
      if (stations[i].owner == _account) {
        result[index] = stations[i];
        index++;
      }
    }
    return result;
  }

  function clearStationsByAccount(address account) public {
    require(msg.sender == account, "Unauthorized access");
    Station[] memory remainingStations = new Station[](stations.length);
    uint256 index = 0;
    for (uint i = 0; i < stations.length; i++) {
      if (stations[i].owner != account) {
        remainingStations[index] = stations[i];
        index++;
      }
    }
    delete stations;
    for (uint i = 0; i < index; i++) {
      stations.push(remainingStations[i]);
    }
  }

  function deleteStationByName(string memory _name) public {
    require(StationExist[_name], "Error: Station does not exist");
    for (uint i = 0; i < stations.length; i++) {
      if (keccak256(abi.encodePacked(stations[i].name)) == keccak256(abi.encodePacked(_name)) && stations[i].owner == msg.sender) {
        stations[i] = stations[stations.length - 1]; 
        stations.pop(); 
        StationExist[_name] = false; 
        break;
      }
    }
  }

  // CHECKBOX FUNCTIONALITY


  function toggleCheckbox() public {
    bool isChecked = accountChecked[msg.sender];
    accountChecked[msg.sender] = !isChecked;  

    for (uint i = 0; i < stations.length; i++) {
      if (stations[i].owner == msg.sender) {
        if (!isChecked) {
          require(stations[i].nbrborne > 0, "No available charging points to reduce");
          stations[i].nbrborne -= 1;  
        } else {
          stations[i].nbrborne += 1;  
        }
        break;  
      }
    }
  }

  function isCheckboxChecked() public view returns (bool) {
      return accountChecked[msg.sender]; 
  }
}
