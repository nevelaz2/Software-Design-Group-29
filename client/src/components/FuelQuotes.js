import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FuelQuoteModal from './GetQuoteModal';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import '../styles/App.css';
import '../styles/FuelQuotes.css';
import { useAuth } from '../contexts/AuthContext';

const FuelQuotes = () => {
  const { user } = useAuth();
  const [validated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [quoteFormData, setQuoteFormData] = useState({
    gallonsRequested: '',
    deliveryDate: '',
    existingCustomer: false,
  });

  const [userAddress, setUserAddress] = useState({
    address1: user.Address1,
    address2: user.Address2,
    city: user.City,
    state: user.State,
    zip: user.Zip
  });

  // Modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  // const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Change Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;

    setQuoteFormData(prevData => {
      return name === 'existingCustomer'
        ? {
          ...prevData,
          existingCustomer: value === 'Yes' ? true : false,
        }
        : {
          ...prevData,
          [name]: value,
        };
    });
  };


  // Submission Handler
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
      const response = await fetch(`http://localhost:3001/user/quotes?userId=${user.UserID}`, {             
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gallonsRequested: quoteFormData.gallonsRequested, 
          deliveryDate: quoteFormData.deliveryDate, 
          location: "TX",
          hasHistory: quoteFormData.existingCustomer ? true : false
        })
      });

      if (response.ok) {
        // alert('Quote created successfully!');
        setShowSuccessModal(true);

        // Redirect user to /quote page (display quote)
        // history.push('/quote')

      } else {
          setShowErrorModal(true); 
          const errorMessage = await response.text();
          throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setErrorMessage('Error submitting quote: ' + error.message);
    }
  };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

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
            {/* <Button variant='primary' onClick={handleSubmit}>Preview Quote</Button> */}
            <FuelQuoteModal quoteDetails={{
              GallonsRequested: quoteFormData.gallonsRequested,
              DeliveryDate: quoteFormData.deliveryDate,
              ExisitngCustomer: quoteFormData.existingCustomer,
              Location: user.State
              }} />
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

            {/* Delivery Address / From user profile */}
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
                        {/* <option>Select</option> */}
                        <option>{userAddress.state}</option>
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
                        <Form.Group controlId='existingCustomer'>
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
      {/* <FuelQuoteModal
        show={showModal}
        closeModal={closeModal}
        quoteFormData={quoteFormData}
        userAddress={userAddress}
      /> */}
      <SuccessModal show={showSuccessModal} closeModal={() => setShowSuccessModal(false)} />
      <ErrorModal show={showErrorModal}  closeModal={() => setShowErrorModal(false)} />



    </Container>
)
};

export default FuelQuotes;
