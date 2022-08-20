import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WelcomeIcon from "../assets/icons/welcome-logo.svg";
import Header from "../components/Header";
import CardComponent from "../components/Card";
import { providerOptions } from "../providerOptions";
import BuyCoin from "./BuyCoin";
import moment from "moment";

const web3Modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions, // required
});

const Home = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [sprice, setSprice] = useState("");
  const [signer, setSigner] = useState("");
  const [page, setPage] = useState("HOME");

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
            chainId: "0x61",
            chainName: "BSC Testnet",
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"],
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
      if (network.chainId !== 97) {
        await selectNetwork(library.provider);
      }
      setPage("BUYCOIN");
    } catch (error) { }
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
          <h2 className="welcome-title">Welcome to Pre-ICO of indexx USD+</h2>
          <p className="welcome-description">
            There are 6 stages of Pre-ICO of indexx USD+, each stage has 2 weeks
            time frame and discount, do not miss!
          </p>
          <div className="text-center">

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRO-ICO STAGE 1"
                  discount="15%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20220815")}
                  edate={moment("20220915")}
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


          </div>
          <div className="">
            <h2 className="instructions">Instructions</h2>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Row>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">1</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Click BUY NOW and link Metamask or Coinbase wallet on Binance Smart Chain
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">2</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Buy tokens with any one of the following:
                    BUSD / BNB / WBTC / WETH / STRIPE
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">3</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Token amount is calculated according to LIVE S&P500 Index price
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">4</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Approve your tokens to allow access to ICO contract and PAY
                  </Card.Text>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="instruction-card">
                  <Card.Text className="instruction-card-number">5</Card.Text>
                  <Card.Text className="instruction-card-details">
                    Tokens are assigned to the wallet and locked in the vesting schedule
                  </Card.Text>
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
                  title="PRO-ICO STAGE 1"
                  discount="15%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20220815")}
                  edate={moment("20220915")}
                />
              </Col>
              <Col xl={6} md={6}>
                <CardComponent
                  title="PRO-ICO STAGE 2"
                  discount="12%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20220916")}
                  edate={moment("20220930")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 3"
                  discount="9%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221001")}
                  edate={moment("20221015")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 4"
                  discount="6%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221016")}
                  edate={moment("20221031")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 5"
                  discount="3%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221101")}
                  edate={moment("20221115")}
                />
              </Col>
              <Col xl={6} md={6} style={{ marginTop: 25 }}>
                <CardComponent
                  title="PRO-ICO STAGE 6"
                  discount="1%"
                  unitPrice={sprice}
                  progressBar={0}
                  sdate={moment("20221116")}
                  edate={moment("20221130")}
                />
              </Col>
            </Row>
          </div>
          {/* <div className="walletBtn-connect" onClick={() => connectWallet()}>
            CONNECT WALLET
          </div> */}
        </Container>
      )}
      {page === "BUYCOIN" && <BuyCoin signer={signer} account={account} />}
    </div>
  );
};

export default Home;
