import { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FuelQuoteModal from './FuelQuoteModal';
import '../styles/App.css';
import '../styles/FuelQuoteModal.css';
import '../styles/FuelQuotes.css';

const FuelQuotes = (userId) => {

  // 
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

  return (
    <Container fluid className='quote-form-container' >

      {/* Filter area
      <Row>
        <Col>
          <h4 className="text-left mb-4">Filter</h4>
          <Form className="quote-history-form">
            <Row>
              <Col lg={2}>
                <Form.Group as={Col} controlId="filterDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date"  />
                </Form.Group>
              </Col>
              <Col lg={2}>
                <Form.Group as={Col} controlId="filterLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Col>
              <Col lg={2}>
                <Form.Group as={Col} controlId="filterGallons">
                  <Form.Label>Gallons</Form.Label>
                  <Form.Control type="number"/>
                </Form.Group>
              </Col>
              <Col lg={1}>
                <Button variant="primary" className="rounded-pill" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row> */}



      {/* Error Message */}
      {errorMessage && 
        <div className="alert alert-danger">
          {errorMessage}
        </div>}


      <Row className="justify-content-center mt-5">
          <Col lg={8}>
            <h4 className="text-left my-5">New Quote</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='quote-form'>
            <Row className="mb-5 mt-3 mx-3">
              {/* Quote Details */}
              <Form.Group as={Col} md="6" controlId="gallonsRequested">
                <Form.Label>Gallons Requested</Form.Label>
                <Form.Control required type="number" name="gallonsRequested" placeholder='Enter Amount' value={formData.gallonsRequested} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please provide a valid gallons requested.</Form.Control.Feedback>
              </Form.Group>   
              <Form.Group as={Col} md="6" controlId="deliveryDate">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control type="date"/>
                <Form.Control.Feedback type="invalid">Please provide a valid date.</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Delivery Address */}
            {/* Should come from User Profile. Get state to store in quote table. */}
            <Row className="mb-3 mt-3 mx-3">
                <Form.Group as={Col} md="6" controlId="deliveryAddress1">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control placeholder="Address" value={userAddress.address1} disabled/>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="deliveryAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apt, Floor, etc." value={userAddress.address2} disabled/>
                </Form.Group>
            </Row>
            <Row className="mb-5 mx-3">
                <Form.Group as={Col} md={6} controlId="deliveryCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="City" value={userAddress.city} disabled/>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="deliveryState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" value={userAddress.state} disabled>
                        <option>Select</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="deliveryZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control placeholder="Zip" value={userAddress.zip} disabled/>
                </Form.Group>
            </Row>

            {/* Customer History */}
            <Row className="mb-2 mx-3">
                <Col md="6">
                    <fieldset>
                        <Form.Group>
                            <Form.Label>Existing Customer?</Form.Label>
                            <div className='mt-2'>
                                <Form.Check inline type="radio" label="No" name="existingCustomer" id="noCustomer" checked={!formData.existingCustomer} onChange={handleChange} />
                                <Form.Check inline type="radio" label="Yes" name="existingCustomer" id="yesCustomer" checked={formData.existingCustomer} onChange={handleChange} />
                            </div>
                        </Form.Group>
                    </fieldset>
                </Col>
            </Row>


            <div className="text-center">
                {/* <Button variant='secondary' className="rounded-pill" onClick={handleClose}>Cancel</Button> */}
                <Button variant="primary" onClick={handleClose} className="rounded-pill m-4">Submit</Button>
                <FuelQuoteModal/>
            </div>
          </Form>
        </Col>
      </Row>







    </Container>
)
};

export default FuelQuotes;
