import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './NavigationBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGasPump } from '@fortawesome/free-solid-svg-icons'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'



const NavigationBar = ({ activeTab }) => {
    return (
      <Navbar bg="dark" expand="lg" className="sidebar">
       <Container fluid>
          <Navbar.Brand href="/profile">
              <img src="/logo.png" className="d-inline-block align-top logo" alt="CoogsEnergy Logo"/>
              <h4>Hello, username!</h4>
          </Navbar.Brand>

          <Navbar.Collapse>
            <Nav className="" id="responsive-navbar-nav">
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

          <Nav>
              {/*Placeholder for Log out link*/}
              <Nav.Link as={Link} to="/profile" active={activeTab === 'profile'}>
                <FontAwesomeIcon icon={faRightFromBracket} className="icons"/>Log Out
              </Nav.Link>
            </Nav>
        </Container>
        
      </Navbar>
    );
};
  
export default NavigationBar;
