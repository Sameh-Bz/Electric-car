const actions = {
  init: "INIT"
};//définit un objet actions qui contient une seule action appelée "init"

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null
};/*objet initialState pour  l'état initial de l'application. 
     contient ( artifact, web3, accounts, networkID
     et contract, qui semblent être liées à Ethereum ou à un environnement de blockchain similaire.*/

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
