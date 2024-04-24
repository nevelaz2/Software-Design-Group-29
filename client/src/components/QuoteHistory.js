// import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import "../styles/QuoteHistory.css";
import "../styles/App.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const QuoteHistory = () => {
  const { user } = useAuth();
  const [q_History, setQ_History] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/user/quotes/history?userId=${user.UserID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setQ_History(data);
    })
    .catch((err) => {
      console.log("Error has occured:", err.message);
    })
  }, []);

  //q_History will be `[]` if user has no History

  return (
    <Container fluid className="quote-history-container">
      {/*Quote History*/}
      <Row className="justify-content-center mt-5">
        <Col lg={8}>
          <h4 className="my-5">Quote History</h4>
          <Table responsive striped hover className="quote-history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Location</th>
                <th>Gallons</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>4</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>5</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>6</td>
                {Array.from({ length: 5 }).map((_, index) => (
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
