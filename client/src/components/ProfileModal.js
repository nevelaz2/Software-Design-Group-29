import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../styles/ProfileModal.css';

import { useAuth } from "../contexts/AuthContext";

function ProfileModal(Props) { 
  const { user, setUser } = useAuth();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages

  // State hooks for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleClose = () => {
    setShow(false);
    setErrorMessage('');  // Clear error messages on close
  };
  const handleShow = () => setShow(true);

  const updateProfile = () => {
    Props.setFirstName(firstName);
    Props.setLastName(lastName);
    Props.setAddress1(address1);
    Props.setAddress2(address2);
    Props.setCity(city);
    Props.setState(state);
    Props.setZip(zip);

    const newUserData = {
      ...user,
      Address1: address1,
      Address2: address2,
      City: city,
      State: state,
      Zip: zip
    }

    setUser(newUserData)
  }

  // Regular expressions for input validation
  const nameRegex = /^[A-Za-z]{2,25}$/;
  const address1Regex = /^(?=.*[A-Za-z]{2,})(?=.*\d)[A-Za-z0-9\s]{2,100}$/;
  const address2Regex = /^[A-Za-z0-9\s]{2,100}$/;
  const cityRegex = /^[A-Za-z\s]{2,100}$/;
  const zipCodeRegex = /^\d{5}(?:-\d{4})?$/;


  // Input constraints
  const validateForm = () => {
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setErrorMessage("Please enter a valid first or last name.");
      return false;
    }

    if (!address1Regex.test(address1)){
      setErrorMessage("Please enter a valid address.");
      return false;
    }

    if (!address2Regex.test(address2)){
      setErrorMessage("Please enter a valid address.");
      return false;
    }

    if (!cityRegex.test(city)){
      setErrorMessage("Please enter a valid city.");
      return false;
    }

    if (!zipCodeRegex.test(zip)){
      setErrorMessage("Please enter a valid zip code.");
      return false;
    }

    setErrorMessage('');

    return true;
  }



  // Submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
    if (!validateForm()) {
      event.stopPropagation();

    } else {
      const profileData = {
        fullname: `${firstName} ${lastName}`,
        address1,
        address2,
        city,
        state,
        zip,
      };

      try {
        console.log(user);

        const response = await fetch(`http://localhost:3001/user/profile/${user.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update profile');
        }

        // Re-render profile data to update the UI
        updateProfile();
        setShow(false);  // Close the modal on success
      } catch (error) {
        console.error('Error updating profile:', error);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <Button className="rounded-pill mt-5 profile-modal-button" variant="primary" onClick={handleShow}>Edit Profile</Button>

      <Modal centered size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            {/* First name input */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isInvalid={errorMessage && (!nameRegex.test(firstName))}
                />
                <Form.Control.Feedback type="invalid">Please enter a valid first name (2-25 characters consisting of letters only).</Form.Control.Feedback>
              </Form.Group>

              {/* Last name input */}
              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isInvalid={errorMessage && (!nameRegex.test(lastName))}
                />
                <Form.Control.Feedback type="invalid">Please enter a valid last name (2-25 characters consisting of letters only).</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Address 1 input */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="address1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Address 1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  isInvalid={errorMessage && (!address1Regex.test(address1))}
                />
                <Form.Control.Feedback type="invalid">Please enter a valid address.</Form.Control.Feedback>
              </Form.Group>

              {/* Address 2 input */}
              <Form.Group as={Col} controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address 2 (Optional)"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  isInvalid={errorMessage && (!address2Regex.test(address2))}
                />
                <Form.Control.Feedback type="invalid">Please enter a valid address.</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* City input */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  isInvalid={errorMessage && (!cityRegex.test(city))}
                />
                <Form.Control.Feedback type="invalid">Please enter a valid city.</Form.Control.Feedback>
              </Form.Group>

              {/* State input */}
              <Form.Group as={Col} controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              {/* Zipcode input */}
              <Form.Group as={Col} controlId="zip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  isInvalid={errorMessage && (!zipCodeRegex.test(zip))}
                />
                <Form.Control.Feedback type="invalid">Please enter a valid zipcode with at least 5 digits.</Form.Control.Feedback>
              </Form.Group>
            </Row>


            <div className="text-center">
              <Button variant='secondary' className="rounded-pill" onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="success" className="rounded-pill">Save Changes</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;
