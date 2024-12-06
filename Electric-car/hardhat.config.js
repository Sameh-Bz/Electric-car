require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks :{
    shimmer: {
      url:'https://json-rpc.evm.testnet.shimmer.network/',
      chainId: 1073,
      accounts: ['c0b8208c048fa0c7e50f4b8cfbd5d2b37c91b05ad3001f0b3c6c68b63263ca4d', 
        '7c6c786ff41e42950c40adc4d0f2578ed3f656dce6b70bf7a9b1248c3ca6eb7c' ,
        'bd44ae1d092343c29ded1acaffcff816dd5ca5b00e6b43754cb89352fb94fa61',
        'fc4bee274730312d6828bf4bb61e8aac39e138d04e06af3b09988490c6d865c6', 
        '16f8e85945bd7a3548d36a2c5223c712aec707b55415a595d06104f319bb6ce6'],
    },

    iota: {
      url:'http://172.28.147.31/wasp/api/v1/chains/tst1ppqz023cdnqe2rtsw7qny2ngh3jqpyd85nf9zzyra2t5rvtnmhfcsd2tcpj/evm',
      chainId: 1074,
      accounts: ['c0b8208c048fa0c7e50f4b8cfbd5d2b37c91b05ad3001f0b3c6c68b63263ca4d', 
        '7c6c786ff41e42950c40adc4d0f2578ed3f656dce6b70bf7a9b1248c3ca6eb7c' ,
        'bd44ae1d092343c29ded1acaffcff816dd5ca5b00e6b43754cb89352fb94fa61',
        'fc4bee274730312d6828bf4bb61e8aac39e138d04e06af3b09988490c6d865c6', 
        '16f8e85945bd7a3548d36a2c5223c712aec707b55415a595d06104f319bb6ce6'],
    },
  },
};









































