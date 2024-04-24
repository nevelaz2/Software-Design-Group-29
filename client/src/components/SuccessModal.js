import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SuccessModal = ({ show, closeModal }) => {
  return (
    <Modal centered show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your quote has been submitted successfully!</p>
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

export default SuccessModal;
