import React from 'react';
import {Container, Table} from 'react-bootstrap';

import './QuoteHistory.css';

const QuoteHistory = () => {
  return (
    <Container fluid className="quote-history">
      <h2>Latest</h2>
      <Table responsive striped hover variant="dark">
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

    </Container>

  );
};

export default QuoteHistory;
