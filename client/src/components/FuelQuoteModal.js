import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../styles/FuelQuoteModal.css';

function ProfileModal() {

  // Modal setup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle form submission
  const [formData, setFormData] = useState({
    gallonsRequested: '',
    location: '', 
    profitMargin: '',
    existingCustomer: false,
    city: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Quote created successfully!');

        // Reset form 
        setFormData({
          gallonsRequested: '',
          profitMargin: '',
          location: '',
          existingCustomer: false,
          city: ''
        });
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
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
      <Button className="quote-modal-button" variant="primary" size='lg' onClick={handleShow}>Create Quote</Button>

      <Modal centered size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quote Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-5 mt-3 mx-3">

              <Form.Group as={Col} md="4" controlId="gallonsRequested">
                <Form.Label>Gallons Requested</Form.Label>
                <Form.Control required type="number" name="gallonsRequested" placeholder='Enter Amount' value={formData.gallonsRequested} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Profit Margin</Form.Label>
                <Form.Control required type="number" name="profitMargin" placeholder='%' value={formData.profitMargin} onChange={handleChange} />
              </Form.Group>         
              <Form.Group as={Col} md="4" controlId="deliveryDate">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control type="date"/>
              </Form.Group>
            </Row>

            <Row className="mb-3 mt-3 mx-3">
                <Form.Group as={Col} md="6" controlId="deliveryAddress">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control placeholder="Address" disabled/>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="deliveryAddress">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apt, Floor, etc." disabled/>
                </Form.Group>
            </Row>

            <Row className="mb-5 mx-3">
                <Form.Group as={Col} md={6} controlId="deliveryAddress">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="City" disabled/>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="deliveryAddress">
                    <Form.Label>State</Form.Label>
                    <Form.Select disabled>
                        <option>Select</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="deliveryAddress">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control placeholder="Zip" disabled/>
                </Form.Group>
            </Row>

            <Row className="mb-2 mx-3">
                <Col md="6">
                    <fieldset>
                        <Form.Group>
                            <Form.Label>Existing Customer?</Form.Label>
                            <div className='mt-2'>
                                <Form.Check inline type="radio" label="No" name="existingCustomer" id="noCustomer"/>
                                <Form.Check inline type="radio" label="Yes" name="existingCustomer" id="yesCustomer"/>
                            </div>
                        </Form.Group>
                    </fieldset>
                </Col>
            </Row>

                
            <div className="text-center">
                {/* <Button variant='secondary' className="rounded-pill" onClick={handleClose}>Cancel</Button> */}
                <Button variant="primary" onClick={handleClose} className="rounded-pill m-4">Submit</Button>
            </div>
                
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;