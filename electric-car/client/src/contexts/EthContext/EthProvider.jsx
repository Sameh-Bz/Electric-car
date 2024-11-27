import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://json-rpc.evm.testnet.shimmer.network/");
        const accounts = await web3.eth.requestAccounts();
        console.log("les accounts",accounts);
        const networkID = await web3.eth.net.getId();
        console.log("id",networkID);
        const { abi } = artifact;
       // console.log(abi);
        let address, contract;
        try {
          
          address="0xfDFabD2c59Ea242274bCf95245852A6b4B670887";
          console.log("address ", address);
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

    useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/ChargeStationFinder.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
