import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../styles/NavigationBar.css'

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="fixed-top px-3 px-md-5 py-3">
      <Container fluid>
        <Navbar.Brand href="/">
            <img src="./assets/logo.png" className="logo-small" alt="CoogsEnergy Logo"/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="text-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
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
