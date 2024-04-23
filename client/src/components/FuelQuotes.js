import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FuelQuoteModal from './GetQuoteModal';
import '../styles/App.css';
import '../styles/FuelQuotes.css';

const FuelQuotes = ({userId}) => {

  const [validated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Input form fields
  const [quoteFormData, setQuoteFormData] = useState({
    gallonsRequested: '',
    deliveryDate: '',
    existingCustomer: false,
  });

  // userAddress 
  const [userAddress, setUserAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });

  // Fetch user's address
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await fetch(`/api/user/profile/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user address! status: ${response.status}`);
        }

        const fetchedUserAddress = await response.json();
        setUserAddress(fetchedUserAddress);
      } catch (error) {
        console.error("Error fetching user's address:", error);
      }
    };

    fetchUserAddress(); 
  }, [userId]);


  // Change handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuoteFormData(prevData => {
      return name === 'existingCustomer'
        ? {
          ...prevData,
          existingCustomer: value === 'Yes',
        }
        : {
          ...prevData,
          [name]: value,
        };
    });
  };

  // Submission handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Input validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {

      // Submit form data
      const response = await fetch('/api/quote', {             
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quoteFormData)
      });
      if (response.ok) {
        alert('Quote created successfully!');

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


  return (
    <Container fluid className='quote-form-container' >

      {/* Error Message */}
      {errorMessage && 
        <div className="alert alert-danger">
          {errorMessage}
        </div>}


      <Row className="justify-content-center mt-5 mx-3">
        <Col lg={8}>

          <div className='d-flex justify-content-between my-5'>
            <h4>New Quote</h4>
            <FuelQuoteModal/>
          </div>
            
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            {/* Quote Details */}
            <Row className="mb-5 mt-3">
              <Form.Group as={Col} md="6" controlId="gallonsRequested">
                <Form.Label>Gallons Requested</Form.Label>
                <Form.Control required type="number" name="gallonsRequested" placeholder='Enter Amount' value={quoteFormData.gallonsRequested} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please provide a valid gallons requested.</Form.Control.Feedback>
              </Form.Group>   
              <Form.Group as={Col} md="6" controlId="deliveryDate">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control type="date" name="deliveryDate" value={quoteFormData.deliveryDate} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please provide a valid date.</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Delivery Address */}
            {/* Should come from User Profile. Get state to store in quote table. */}
            <Row className="my-3">
                <Form.Group as={Col} md="6" controlId="deliveryAddress1">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control placeholder="Address" value={userAddress.address1} disabled/>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="deliveryAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apt, Floor, etc." value={userAddress.address2} disabled/>
                </Form.Group>
            </Row>
            <Row className="mb-5">
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
            <Row className="mb-2">
                <Col md="6">
                    <fieldset>
                        <Form.Group controlId={"noCustomer"}>
                            <Form.Label>Existing Customer?</Form.Label>
                            <div className='mt-2'>
                                <Form.Check inline type="radio" label="No" name="existingCustomer" value="No" id="noCustomer" checked={!quoteFormData.existingCustomer} onChange={handleChange} />
                                <Form.Check inline type="radio" label="Yes" name="existingCustomer" value="Yes" id="yesCustomer" checked={quoteFormData.existingCustomer} onChange={handleChange} />
                            </div>
                        </Form.Group>
                    </fieldset>
                </Col>
            </Row>

            <div className="text-center">
                <Button variant="primary" className="rounded-pill m-4" onClick={handleSubmit}>Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>

    </Container>
)
};

export default FuelQuotes;
