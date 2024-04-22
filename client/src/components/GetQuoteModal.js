import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../styles/GetQuoteModal.css';

function GetQuoteModal({userId}) {

  // Modal
  const [show, setShow] = useState(false);
  const [validated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form fields
  const [formData, setFormData] = useState({
    gallonsRequested: '',
    deliveryDate: '',
    existingCustomer: false,
  });

  // userAddress state
  const [userAddress, setUserAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });


  const handleClose = () => {
    setShow(false);
    setErrorMessage('');

    // Reset form data 
    setFormData({
      gallonsRequested: '',
      deliveryDate: '',
      existingCustomer: false,
    });
  };

  const handleShow = () => setShow(true);

  // Handle input submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Input validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {

      // Fetch user's address 
      const fetchedUserAddress = await fetchUserAddress(userId);
      setUserAddress(fetchedUserAddress);

      // Submit form data
      const response = await fetch('/api/quote', {             
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Quote created successfully!');

        handleClose();

        // Redirect user to /quote page (display quote)
        // history.push('/quote')

      } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setErrorMessage('Error submitting quote: ' + error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  // Fetch user's address
  async function fetchUserAddress(userId) {
    try {
      const response = await fetch(`/api/user/${userId}/address`);
      if (!response.ok) {
        throw new Error('Failed to fetch user address');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }


  // Fuel Quote Form
  return (
    <>
      <Button className="quote-modal-button" variant="primary" size='lg' onClick={handleShow}>Get Quote</Button>

      <Modal centered size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quote Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {/* Error Message */}
          {errorMessage && 
            <div className="alert alert-danger">
              {errorMessage}
            </div>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            {/* Request Details */}
            <Row className="mb-3 mt-3 mx-3">
              <Form.Group as={Col} md="6" controlId="gallonsRequested">
                <Form.Label>Gallons Requested</Form.Label>
                <Form.Control required type="number" name="gallonsRequested" placeholder='Enter Amount' value={formData.gallonsRequested} onChange={handleChange} disabled />
                <Form.Control.Feedback type="invalid">Please provide a valid gallons requested.</Form.Control.Feedback>
              </Form.Group>   
              <Form.Group as={Col} md="6" controlId="deliveryDate">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control type="date" name='deliveryDate' value={formData.deliveryDate} onChange={handleChange} disabled/>
                <Form.Control.Feedback type="invalid">Please provide a valid date.</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Customer Details */}
            <Row className="mb-5 mx-3">
              <Form.Group as={Col} md="6" controlId="hasHistory">
                <Form.Label>Existing Customer?</Form.Label>
                <Form.Control type="text" name="hasHistory" placeholder='Yes/No' value={formData.hasHistory} onChange={handleChange} disabled />
              </Form.Group>   
              <Form.Group as={Col} md="6" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} placeholder='In-State/Out-of-State' disabled/>
              </Form.Group>
            </Row>
            

            {/* Quote Details */}
            <Row className="mb-5 mx-3">
              <Form.Group as={Col} md="6" controlId="suggestedPrice">
                <Form.Label>Suggested Price </Form.Label>
                <Form.Control type="text" name="suggestedPrice" placeholder="suggestedPrice" value={formData.suggestedPrice} onChange={handleChange} readOnly  />
              </Form.Group>   
              <Form.Group as={Col} md="6" controlId="totalPrice">
                <Form.Label>Total Due</Form.Label>
                <Form.Control type="text" name="totalPrice" placeholder="totalPrice" value={formData.totalPrice} onChange={handleChange} readOnly  />
              </Form.Group>
            </Row>


            <div className="text-center">
                <Button variant='secondary' className="rounded-pill" onClick={handleClose}>Cancel</Button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GetQuoteModal;