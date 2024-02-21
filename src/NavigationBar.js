import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './NavigationBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGasPump } from '@fortawesome/free-solid-svg-icons'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'



const NavigationBar = ({ activeTab }) => {
    return (
      <Navbar bg="dark" expand="lg" className="sidebar">
       
          <Navbar.Brand href="/profile" className="logo-container">
              <img src="/logo.png" className="d-inline-block align-top logo" alt="CoogsEnergy Logo"/>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/profile" active={activeTab === 'profile'}>
                <FontAwesomeIcon icon={faUser} className="icons" /> Profile 
              </Nav.Link>
              <Nav.Link as={Link} to="/fuel-quote" active={activeTab === 'fuel-quote'}>
                <FontAwesomeIcon icon={faGasPump} className="icons" />Fuel Quote
              </Nav.Link>
              <Nav.Link as={Link} to="/quote-history" active={activeTab === 'quote-history'}>
                <FontAwesomeIcon icon={faClockRotateLeft} className="icons" />Quote History
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        
      </Navbar>
    );
};
  
export default NavigationBar;
