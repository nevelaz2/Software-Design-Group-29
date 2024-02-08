import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './NavigationBar.css';

const NavigationBar = ({ activeTab }) => {
    return (
      <Navbar bg="dark" expand="lg" className="sidebar">
        <Container>
          <Navbar.Brand href="/profile">
              <img src="/logo.png" className="d-inline-block align-top logo" alt="CoogsEnergy Logo"/>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/profile" active={activeTab === 'profile'}>
                Profile 
              </Nav.Link>
              <Nav.Link as={Link} to="/fuel-quote" active={activeTab === 'fuel-quote'}>
                Fuel Quote
              </Nav.Link>
              <Nav.Link as={Link} to="/quote-history" active={activeTab === 'quote-history'}>
                Quote History
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};
  
export default NavigationBar;
