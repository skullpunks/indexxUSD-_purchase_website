import { useEffect, useState } from "react";
import {
  VStack,
  Button,
  Text,
  HStack,
  Select,
  Input
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { toHex, truncateAddress } from "./utils";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";

const web3Modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions // required
});

const paymentABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_upgradedAddress", type: "address" }],
    name: "deprecate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "deprecated",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_evilUser", type: "address" }],
    name: "addBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "upgradedAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balances",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "maximumFee",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "_totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "unpause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_maker", type: "address" }],
    name: "getBlackListStatus",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" }
    ],
    name: "allowed",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "pause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "newBasisPoints", type: "uint256" },
      { name: "newMaxFee", type: "uint256" }
    ],
    name: "setParams",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "issue",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "redeem",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "basisPointsRate",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "isBlackListed",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_clearedUser", type: "address" }],
    name: "removeBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "MAX_UINT",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_blackListedUser", type: "address" }],
    name: "destroyBlackFunds",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "_initialSupply", type: "uint256" },
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
      { name: "_decimals", type: "uint256" }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Issue",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Redeem",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "newAddress", type: "address" }],
    name: "Deprecate",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "feeBasisPoints", type: "uint256" },
      { indexed: false, name: "maxFee", type: "uint256" }
    ],
    name: "Params",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_blackListedUser", type: "address" },
      { indexed: false, name: "_balance", type: "uint256" }
    ],
    name: "DestroyedBlackFunds",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "AddedBlackList",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "RemovedBlackList",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  { anonymous: false, inputs: [], name: "Pause", type: "event" },
  { anonymous: false, inputs: [], name: "Unpause", type: "event" }
];

const icoABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_reserveWallet",
        type: "address"
      },
      {
        internalType: "address",
        name: "_token",
        type: "address"
      },
      {
        internalType: "address",
        name: "_timelockContract",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_openingTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_closingTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_investorMinCap",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_discount",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "purchaser",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "TokenPurchase",
    type: "event"
  },
  {
    stateMutability: "payable",
    type: "fallback"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "acceptedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      }
    ],
    name: "buyIndexxFromAnyBEP20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address"
      }
    ],
    name: "buyIndexxFromBNB",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_discount",
        type: "uint256"
      }
    ],
    name: "changeDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newAdmin",
        type: "address"
      }
    ],
    name: "changeIcoAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "closingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "contributions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "discount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "hasClosed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "icoAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "investorMinCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "openingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "reserveWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_openingTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_closingTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_discount",
        type: "uint256"
      }
    ],
    name: "scheduleSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "sp500ByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "timelockContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "weiRaised",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];

const icoAddress = "0x68A62a16d381fd8C11F092b3Eea68845C3Db721E";

const chainlinkABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];


export default function Home() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [payment, setPayment] = useState("");
  const [inputtoken, setInputtoken] = useState("");
  const [token, setToken] = useState("");

  const payCrypto = async () => {
    try {
      const ico_contract = new ethers.Contract(icoAddress, icoABI, signer);
      let tx;
      if (payment === "0x0000000000000000000000000000000000000000") {
        tx = await ico_contract.buyIndexxFromBNB(account, {
          value: ethers.utils.parseUnits(inputtoken, "ether")
        });
      } else if (payment !== "") {
        tx = await ico_contract.buyIndexxFromAnyBEP20(
          account,
          ethers.utils.parseUnits(inputtoken, "ether"),
          payment
        );
      }
      console.log(`Transaction hash: ${tx.hash}`);

      const receipts = await tx.wait();
      console.log(`Transaction confirmed in block ${receipts.blockNumber}`);
      console.log(`Gas used: ${receipts.gasUsed.toString()}`);
    } catch (error) {
      setError(error);
    }
  };

  const approve = async () => {
    try {
      const paymentContract = new ethers.Contract(payment, paymentABI, signer);
      const tx = await paymentContract.approve(
        "0x68A62a16d381fd8C11F092b3Eea68845C3Db721E",
        ethers.utils.parseUnits(inputtoken, "ether")
      );
      console.log(`Transaction hash: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
      console.log(`Gas used: ${receipt.gasUsed.toString()}`);
    } catch (error) {
      setError(error);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      const signer = library.getSigner();
      setSigner(signer);
      alert(network.chainId);
      if (network.chainId !== 97) {
        alert("chain not 97");
        await selectNetwork(library.provider);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handlePayment = async (e) => {
    const tokenContract = e.target.value;
    console.log('tokenContract', tokenContract);
    setPayment(tokenContract);
    // await getAssignTokens();
    let addr = "";
    let tokenPrice = 0;
    let spprice = 0;
    let spaddr = "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e";

    // alert(payment);
    if (tokenContract === "0x0000000000000000000000000000000000000000") {
      addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
    } else if (tokenContract === "0xFd6a8739Ce434f5cB52FB4d4E0DBeA4a9cB25532") {
      addr = "1";
    } else if (tokenContract === "0xd15B482A08b44FA055Ad77dF5Cc99dae6E3A4184") {
      addr = "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf";
    } else if (tokenContract === "0x9b9f1b34bC30e2789DB71eD18C749167880215Bd") {
      addr = "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e";
    } else {
      // stripe payment
    }

    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    if (addr === "1") {
      tokenPrice = 1;
    } else if (addr !== "") {
      const tokenFeed = new ethers.Contract(addr, chainlinkABI, rpcProvider);
      await tokenFeed.latestRoundData().then((roundData) => {
        tokenPrice = roundData[1] / 100000000;
        console.log("token value: " + tokenPrice);
      });
    }
    const spFeed = new ethers.Contract(spaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      console.log("sp500 value: " + spprice);
    });

    let rate = inputtoken * (tokenPrice / spprice);
    setToken(Math.round(rate * 100) / 100);
  };

  const setInputValue = async (e) => {
    let inputs = e.target.value;
    setInputtoken(inputs);
    let addr = "";
    let tokenPrice = 0;
    let spprice = 0;
    let spaddr = "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e";

    if (payment === "0x0000000000000000000000000000000000000000") {
      addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
    } else if (payment === "0xFd6a8739Ce434f5cB52FB4d4E0DBeA4a9cB25532") {
      addr = "1";
    } else if (payment === "0xd15B482A08b44FA055Ad77dF5Cc99dae6E3A4184") {
      addr = "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf";
    } else if (payment === "0x9b9f1b34bC30e2789DB71eD18C749167880215Bd") {
      addr = "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e";
    } else {
      // stripe payment
    }

    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    if (addr === "1") {
      tokenPrice = 1;
    } else if (addr !== "") {
      const tokenFeed = new ethers.Contract(addr, chainlinkABI, rpcProvider);
      await tokenFeed.latestRoundData().then((roundData) => {
        tokenPrice = roundData[1] / 100000000;
        console.log("token value: " + tokenPrice);
      });
    }
    const spFeed = new ethers.Contract(spaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      console.log("sp500 value: " + spprice);
    });

    let rate = inputs * (tokenPrice / spprice);
    setToken(Math.round(rate * 100) / 100);
  };

  const selectNetwork = async (asset) => {
    try {
      alert("net change");
      await asset.send('wallet_switchEthereumChain', [{ chainId: `0x13881` }])
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await asset.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x13881',
              rpcUrls: ['https://api.harmony.one'],
              chainName: 'Harmony Mainnet',
              nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
              blockExplorerUrls: ['https://explorer.harmony.one'],
              iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png'],
            }],
          })
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setPayment("");
    setToken("");
    setInputtoken("");
  };

  const disconnect = async () => {
    refreshState();
  };

  const indexPrice = async () => {

    let spprice = 0;
    let spaddr = "0xb24D1DeE5F9a3f761D286B56d2bC44CE1D02DF7e";
    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    console.log('rpcProvider', rpcProvider)
    const spFeed = new ethers.Contract(spaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      spprice = Math.round(spprice * 100) / 100
      return spprice;

    });
    console.log("spFeed", spFeed)
  }

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <>
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <HStack marginBottom="10px">
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
          ></Text>
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
            sx={{
              background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Indexx500
          </Text>
        </HStack>
        <HStack>
          {!account ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
        </HStack>
        <VStack justifyContent="center" alignItems="center" padding="10px 0">
          <HStack>
            <Text>{`Connection Status: `}</Text>
            {account ? (
              <CheckCircleIcon color="green" />
            ) : (
              <WarningIcon color="#cd5700" />
            )}
          </HStack>

          <Tooltip label={account} placement="right">
            <Text>{`Account: ${truncateAddress(account)}`}</Text>
          </Tooltip>
          <Text>{`Network ID: ${chainId ? chainId : "No Network"}`}</Text>
        </VStack>
        <VStack>
          <Button>Select Payment Option</Button>
          <Select placeholder="Select Payment" onChange={handlePayment}>
            <option value="0x0000000000000000000000000000000000000000">
              BNB: Binance Coin
            </option>
            <option value="0xFd6a8739Ce434f5cB52FB4d4E0DBeA4a9cB25532">
              BUSD: Binance USD
            </option>
            <option value="0xd15B482A08b44FA055Ad77dF5Cc99dae6E3A4184">
              WBTC: Bitcoin on BSC
            </option>
            <option value="0x9b9f1b34bC30e2789DB71eD18C749167880215Bd">
              WETH: Ethereum on BSC
            </option>
            <option value="stripe">Pay with Stripe ($)</option>
          </Select>
        </VStack>
        <VStack justifyContent="center" alignItems="center" padding="10px 0">
          <Input
            onChange={setInputValue}
            value={inputtoken}
            placeholder="Enter Amount to Pay:"
          />
        </VStack>
        <VStack justifyContent="center" alignItems="center" padding="10px 0">
          <Text>{`Assign Indexx500 Tokens: ${token ? token : "0"}`}</Text>
        </VStack>

        <Text>{error ? error.message : null}</Text>
        <Button onClick={payCrypto}>Payment</Button>
        <Button onClick={approve}>Approve</Button>
        <Button onClick={indexPrice}>live price</Button>

      </VStack>
    </>
  );
}
