import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WelcomeIcon from "../assets/icons/welcome-logo.svg";
import Header from "../components/Header";
import Footer from "../components/Footer"
import CardComponent from "../components/Card";
import { providerOptions } from "../providerOptions";
import BuyCoin from "./BuyCoin";
import moment from "moment";
import InstructionsModal from "../components/InstructionsModal";

const web3Modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions, // required
});

const Home = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [networkName, setNetworkName] = useState();
  const [sprice, setSprice] = useState("");
  const [signer, setSigner] = useState("");
  const [page, setPage] = useState("HOME");
  const [showInstructionsModal, setShowInstructionsModal] = useState(false)

  const chainlinkABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const selectNetwork = async (asset) => {
    try {
      asset.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            chainName: "BSC Mainnet",
            rpcUrls: ["https://bsc-dataseed1.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
            nativeCurrency: {
              symbol: "BNB",
              decimals: 18,
            },
          },
        ],
      });
    } catch (switchError) {
      console.log(switchError);
    }
  };

  const connectWallet = async () => {
    try {
      let provider = await web3Modal.connect();
      let library = new ethers.providers.Web3Provider(provider);
      let accounts = await library.listAccounts();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);

      const signer = library.getSigner();
      setSigner(signer);
      let network = await library.getNetwork();
      setNetworkName(network.name);
      setChainId(network.chainId);

      if (network.chainId !== 56) {
        await selectNetwork(library.provider);
      } else {
        setPage("BUYCOIN");
      }
      setPage("BUYCOIN");
    } catch (error) {
      if (window.confirm(' Please Install Metamask wallet to participate in PRE-ICO ')) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
          '_blank'
        );
      };

    }
  };

  const indexPrice = async () => {
    let spprice = 0;
    let usdtaddr = "0xB97Ad0E74fa7d920791E90258A6E2085088b4320";
    let rpcProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.binance.org/"
    );
    const spFeed = new ethers.Contract(usdtaddr, chainlinkABI, rpcProvider);
    await spFeed.latestRoundData().then((roundData) => {
      spprice = roundData[1] / 10000000000;
      spprice = Math.round(spprice * 100);
      setSprice(spprice);
      return spprice;
    });
  };

  useEffect(() => {
    indexPrice();
  }, []);

  return (
    <div>
      <Header />
      {page === "HOME" && (
        <Container>
          <h2 className="welcome-title">Welcome to Pre-ICO of indexx USD+(iUSD+)</h2>
          <p className="welcome-description">
            There are 6 stages of Pre-ICO of indexx USD+, each stage has 2 weeks
            time frame and discount, do not miss!
          </p>
          <div className="text-center">

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRE-ICO STAGE 1"
                  discount="15%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20220915")}
                  edate={moment("20221015")}
                />
              </Col>
            </div>

            {/* <img
              src={WelcomeIcon}
              alt="welcome-icon"
              className="welcome-icon"
            /> */}

            <div className="walletBtn-connect" onClick={() => connectWallet()}>
              BUY NOW
            </div>

            <div className="warningBarContainer">
              <label htmlFor="viewVideoButton">Going through the Instructions is highly suggested before proceeding further!!!</label>
            </div>


            { showInstructionsModal &&
                <InstructionsModal
                    isOpen={showInstructionsModal}
                    closeModal={() => setShowInstructionsModal(false)}
                />
            }



          </div>
          <div className="instructionsHeading">
            <h2 className="instructions">Instructions</h2>
            <button id="viewVideoButton" className="viewVideo" onClick={() => setShowInstructionsModal(true)}>
              Watch Video
            </button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Row>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">1</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Click BUY NOW and link Metamask or Coinbase wallet: <br></br>
                    Make sure you are on Binance Smart Chain Network
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">2</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Payment Options: BUSD / BNB / WBTC / WETH / STRIPE <br></br>
                    Only Wrapped Bitcoin and Ethereum allowed which is on Binance Chain
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">3</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Token amount is Pegged with Tether(USDT) Price
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">4</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Approve your tokens to allow access to ICO contract  <br></br>
                    Scroll down on Metamask page to confirm approval
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">5</Card.Text>
                  <div className="informationCard">
                    <Card.Text className="instruction-card-details">
                      Tokens are assigned to the wallet and locked in  <br></br> the vesting schedule
                    </Card.Text>
                    <Card.Text className="instruction-card-details">
                      <a className="link"
                        target="_blank"
                        href={"https://bscscan.com/address/0x44D37703A37C617b6B824Eb45615aC5304740305#readContract"}> Check Your Tokens</a>
                    </Card.Text>
                  </div>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">6</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Added Discount tokens will be transferred to the same wallet instantly
                  </Card.Text>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="curculating">
            <h2>
              <span className="supply">TOTAL PRE-ICO SUPPLY:</span>{" "}
              <span className="price">600,000</span>
            </h2>
          </div>

          <div>
            <Row className="amount-card">
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRE-ICO STAGE 1"
                  discount="15%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20220915")}
                  edate={moment("20221015")}
                />
              </Col>
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRE-ICO STAGE 2"
                  discount="12%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221016")}
                  edate={moment("20221031")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRE-ICO STAGE 3"
                  discount="9%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221101")}
                  edate={moment("20221115")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRE-ICO STAGE 4"
                  discount="6%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221116")}
                  edate={moment("20221130")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRE-ICO STAGE 5"
                  discount="3%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221201")}
                  edate={moment("20221215")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRE-ICO STAGE 6"
                  discount="1%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221216")}
                  edate={moment("20221231")}
                />
              </Col>
            </Row>
          </div>
          {/* <div className="walletBtn-connect" onClick={() => connectWallet()}>
            CONNECT WALLET
          </div> */}
        </Container>
      )}
      {page === "BUYCOIN" && <BuyCoin signer={signer} account={account} networkName={networkName} />}
      <br></br><br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default Home;
