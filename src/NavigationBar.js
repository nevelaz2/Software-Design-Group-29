import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavigationBar.css'

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="fixed-top">
      <Container fluid className="px-1 px-md-2 py-lg-1">
        <Navbar.Brand href="/home">
            <img src="/logo.png" className="align-top logo-small" alt="CoogsEnergy Logo"/>
        </Navbar.Brand>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav pullright className="ms-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
