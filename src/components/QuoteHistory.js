import React from 'react';
import {Container, Row, Col, Form, Table, Button} from 'react-bootstrap';
import '../styles/QuoteHistory.css';

const QuoteHistory = () => {
  return (
    <Container fluid className="quote-history-container">

      {/* Filter area */}
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
      </Row>
          

      {/*History data*/}
      <Row>
        <Col>
          <h4 className="text-left mb-4">Latest</h4>
          <Table responsive striped hover className="quote-history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>State</th>
              <th>City</th>
              <th>Gallons</th>
              <th>Profit Margin</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
              <td>2</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
              <td>3</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
              <td>4</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
              <td>5</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
              <td>6</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
              <td>7</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
              <td>8</td>
                {Array.from({ length: 7 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
            </tr>
          </tbody>
        </Table>
        
        </Col>
      </Row>
        
    </Container>
  )
};

export default QuoteHistory;
