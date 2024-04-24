import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ErrorModal = ({ show, closeModal }) => {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Error submitting quote. Check required fields.</p>
        {/* Add any other content as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
        {/* Add any other buttons as needed */}
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
