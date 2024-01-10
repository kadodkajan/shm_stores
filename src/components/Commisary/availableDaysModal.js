// AvailableDaysModal.js
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AvailableDaysModal({ showModal, handleClose, handleSaveChanges, guide }) {
  const handleSaveAndClose = (e) => {
    handleSaveChanges(e);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Available Days</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <Form.Check
              key={day}
              type="checkbox"
              label={day}
              name="availableDays"
              id={`day-${day} `}
              value={day}
              checked={guide.availableDays.includes(day)}
              onChange={(e) => handleSaveChanges(e)}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveAndClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AvailableDaysModal;
