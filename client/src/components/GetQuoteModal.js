
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../styles/GetQuoteModal.css';
import { useAuth } from '../contexts/AuthContext';

function GetQuoteModal({ quoteDetails }) {
  const { user } = useAuth()
  const [show, setShow] = useState(false);
  const [prices, setPrices] = useState({
    suggestedPrice: 0,
    totalDue: 0
  })

  const [formData, setFormData] = useState({
    gallonsRequested: quoteDetails.GallonsRequested,
    deliveryDate: quoteDetails.DeliveryDate,
    existingCustomer: quoteDetails.ExisitngCustomer,
    location: quoteDetails.Location
  });

  // userAddress state
  const [userAddress, setUserAddress] = useState({
    address1: user.Address1,
    address2: user.Address2,
    city: user.City,
    state: user.State,
    zip: user.Zip,
  });

  useEffect(() => {
    setFormData({
      gallonsRequested: quoteDetails.GallonsRequested,
      deliveryDate: quoteDetails.DeliveryDate,
      existingCustomer: quoteDetails.ExisitngCustomer,
      location: quoteDetails.Location
    })

    fetch(`http://localhost:3001/getpricing?gallonsRequested=${quoteDetails.GallonsRequested}&existingCustomer=${quoteDetails.ExisitngCustomer}&Location=${quoteDetails.Location}`)
    .then((res) => res.json())
    .then((data) => {
      setPrices({
        suggestedPrice: data.suggestedPrice,
        totalDue: data.totalDue
      })
    })
    .catch((err) => {
      console.log("An error has occured:", err.message);
      setPrices({
        suggestedPrice: null,
        totalDue: null
      })
    })

  }, [quoteDetails])

  const handleClose = () => {
    setShow(false);
    // setErrorMessage('');
  };

  const handleShow = () => {
    setShow(true);
  };

  // Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Input validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Fuel Quote Form
  return (
    <>
      <Button className="quote-modal-button" variant="primary" size='lg' onClick={handleShow}>Get Quote</Button>

      <Modal centered size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quote Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form onSubmit={handleSubmit}>

            {/* Request Details */}
            <Row className="mb-3 mt-3 mx-3">
              <Form.Group as={Col} md="6" controlId="gallonsRequested">
                <Form.Label>Gallons Requested</Form.Label>
                <Form.Control required type="number" name="gallonsRequested" placeholder='Enter Amount' value={formData.gallonsRequested} onChange={handleChange} disabled />
              </Form.Group>   
              <Form.Group as={Col} md="6" controlId="deliveryDate">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control type="date" name='deliveryDate' value={formData.deliveryDate} onChange={handleChange} disabled/>
              </Form.Group>
            </Row>

            {/* Customer Details */}
            <Row className="mb-5 mx-3">
              <Form.Group as={Col} md="6" controlId="hasHistory">
                <Form.Label>Existing Customer?</Form.Label>
                <Form.Control type="text" name="hasHistory" placeholder='Yes/No' value={formData.existingCustomer ? "Yes" : "No"} onChange={handleChange} disabled />
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
                <Form.Control type="text" name="suggestedPrice" placeholder="suggestedPrice" value={prices.suggestedPrice} onChange={handleChange} readOnly  />
              </Form.Group>   
              <Form.Group as={Col} md="6" controlId="totalPrice">
                <Form.Label>Total Due</Form.Label>
                <Form.Control type="text" name="totalPrice" placeholder="totalPrice" value={prices.totalDue} onChange={handleChange} readOnly  />
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