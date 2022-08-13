import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LogoIcon from "../assets/icons/indexx500.gif";

const Header = () => {
  return (
    <Navbar className="main-header" expand="lg">
      <Container>
        <Navbar.Brand href="https://www.indexx.ai/indexx-500">
          <img src={LogoIcon} alt="logo" className="indexx-icon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Our Solution
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Vision</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Mission</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Value Proposition
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Technology" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Blockchain
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">MetaFi</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Web 3.0</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Metaverse
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">NFTs</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">DAO</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">DeFi</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Marketplace
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#home">Marketplace</Nav.Link>
              <Nav.Link href="#home">Features</Nav.Link>
              <Nav.Link href="#home">MetaFi</Nav.Link>
              <NavDropdown title="Tokenomic" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Token</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Airdrop</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Document" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Lite WhitePaper
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Full WhitePaper
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Header;
