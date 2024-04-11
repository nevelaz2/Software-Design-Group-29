import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/App.css';
import '../styles/FuelQuoteForm.css';


const FuelQuoteForm = () => {

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
            location: '',
            profitMargin: '',
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
  
    return (
      // Fuel quote form
      <div className='quote-form'>
        <h1 id="title"> Quote Details </h1>
        <div id="container">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="gallonsRequested">
              <Form.Label column sm={4}> Gallons Requested </Form.Label>
              <Col sm={4}>
                <Form.Control type="number" name="gallonsRequested" value={formData.gallonsRequested} onChange={handleChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="profitMargin">
              <Form.Label column sm={4}> Profit Margin </Form.Label>
              <Col sm={8}>
                <Form.Control type="number" name="gallonsRequested" value={formData.gallonsRequested} onChange={handleChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="deliveryAddress">
              <Form.Label column sm={4}> Delivery Address </Form.Label>
              <Col sm={8}>
                <p className="small disabled"> Non-editable, from client profile.</p>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="deliveryDate">
              <Form.Label column sm={4}> Delivery Date </Form.Label>
              <Col sm={8}>
                <Form.Control type="input" name="profitMargin" value={formData.profitMargin} onChange={handleChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="existingCustomer">
              <Form.Label column sm={4}> Existing Customer? </Form.Label>
              <Col sm={8}>
                <Form.Check type="checkbox" id="existingCustomer" label="Yes" name="existingCustomer" checked={formData.existingCustomer} onChange={handleChange} />
                <Form.Check type="checkbox" id="existingCustomer" label="No" name="existingCustomer" checked={formData.existingCustomer} onChange={handleChange} />
              </Col>
            </Form.Group>


            <Button type="submit" id="submit"> Submit </Button>
          </Form>
        </div>
      </div>
    );
  };



export default FuelQuoteForm;
