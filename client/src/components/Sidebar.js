import React from 'react';
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'; 
import "../styles/Sidebar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGasPump } from '@fortawesome/free-solid-svg-icons'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'



const Sidebar = () => {
    return (
      <Navbar className="sidebar">
       <Container fluid>
          <Navbar.Brand href="/user">
              <img src="./assets/logo.png"  className="portal-logo" alt="CoogsEnergy Logo"/>
              <h5>Hi, username!</h5> 
          </Navbar.Brand>

          <Navbar.Collapse>
            <Nav id="responsive-navbar-nav">
              <div className="user-links">
                <Nav.Link className="mb-3" as={Link} to="/user/profile">
                  <FontAwesomeIcon icon={faUser} className="icons" /> Profile 
                </Nav.Link>
                <Nav.Link className="mb-3" as={Link} to="/user/fuel-quote">
                  <FontAwesomeIcon icon={faGasPump} className="icons" />Fuel Quote
                </Nav.Link>
                <Nav.Link className="mb-5" as={Link} to="/user/quote-history">
                  <FontAwesomeIcon icon={faClockRotateLeft} className="icons" />Quote History
                </Nav.Link>
              </div>


              <div className="log-out">
                {/*Placeholder for Log out link*/}
                <Nav.Link className="pt-5" as={Link} to="/user">
                  <FontAwesomeIcon icon={faRightFromBracket} className="icons"/>Log Out
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>

          
        </Container>
        
      </Navbar>
    );
};
  
export default Sidebar;
