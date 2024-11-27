//créer un hook personnalisé pour accéder à un contexte Ethereum dans une application React
import { useContext } from "react";
import EthContext from "./EthContext";

const useEth = () => useContext(EthContext); //définit un hook personnalisé nommé useEth

export default useEth;
