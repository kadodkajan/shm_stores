import React, { useState } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";

function OrderGuide() {
  const [guide, setGuide] = useState({
    guideName: "",
    products: [],
    availableDays: [],
    cutoffTime: { hours: 0, minutes: 0, period: "AM" },
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuide((prevGuide) => ({ ...prevGuide, [name]: value }));
  };

  const handleAvailableDaysChange = (e) => {
    const { value, checked } = e.target;
    setGuide((prevGuide) => ({
      ...prevGuide,
      availableDays: checked
        ? [...prevGuide.availableDays, value]
        : prevGuide.availableDays.filter((day) => day !== value),
    }));
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setGuide((prevGuide) => ({
      ...prevGuide,
      cutoffTime: { ...prevGuide.cutoffTime, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission
    console.log("Form Submitted:", guide);
    setGuide({
      guideName: "",
      products: [],
      availableDays: [],
      cutoffTime: { hours: 0, minutes: 0, period: "AM" },
    });
  };

  return (
    <>
      <ComNavbar />
      <Container className="mt-4">
        <div className="card mt-3">
          <div className="card-body">
            <Row>
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="guideName">
                    <Form.Label>Guide Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="guideName"
                      value={guide.guideName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="availableDays">
                    <p>
                      Available Days :
                      <Button variant="primary" onClick={handleModalShow}>
                        Select Days
                      </Button>
                    </p>
                  </Form.Group>
                  <br />

                  <Form.Group>
                    <p>Cutoff Time:</p>
                    <Row>
                      <Col>
                        <Form.Control
                          id="hours"
                          type="number"
                          name="hours"
                          value={guide.cutoffTime.hours}
                          onChange={handleTimeChange}
                          min={1}
                          max={12}
                          placeholder="Hours"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          id="minutes"
                          type="number"
                          name="minutes"
                          value={guide.cutoffTime.minutes}
                          onChange={handleTimeChange}
                          min={0}
                          max={59}
                          placeholder="Minutes"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          id="format"
                          as="select"
                          name="period"
                          value={guide.cutoffTime.period}
                          onChange={handleTimeChange}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>

                  <br />
                  <Button type="submit" variant="success">
                    Create Guide{" "}
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </Container>

      {/* Modal for Available Days */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Available Days</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <Form.Check
                key={day}
                type="checkbox"
                label={day}
                name="availableDays"
                id={`day-${day} `}
                value={day}
                checked={guide.availableDays.includes(day)}
                onChange={handleAvailableDaysChange}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderGuide;
