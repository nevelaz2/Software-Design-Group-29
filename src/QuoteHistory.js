import React from 'react';
import {Container, Table, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
import './QuoteHistory.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon icon={faCalendarDays} />

const QuoteHistory = () => {
  return (
    
   
    <Container fluid className="quote-history">
       {/*Filter area*/}
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="mm/dd/yyyy" aria-label="Date" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
        </Row>
    </Form>

      <Row>
        <Col>
          <h3 className="table-title">Latest</h3>
        </Col>
      </Row>
      <Row>
        <Col>
           {/*History data*/}
          <Table responsive striped hover variant="dark" className="history-table">
          <thead>
            <tr>
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
              {Array.from({ length: 7 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              {Array.from({ length: 7 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              {Array.from({ length: 7 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              {Array.from({ length: 7 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              {Array.from({ length: 7 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          </tbody>

        </Table>
        
        
        </Col>
      </Row>
      

    </Container>

  );
};

export default QuoteHistory;
