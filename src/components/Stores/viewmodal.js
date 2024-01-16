// ViewModal.js
import React from "react";
import { Modal, Button, Table, Card, Row, Col } from "react-bootstrap";

const ViewModal = ({ show, handleClose, selectedGuide }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Guide Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedGuide && (
          <div>
            <Row>
            <Col md={4}>
              {/* Name Card */}
              <Card className="mb-3">
                <Card.Header>Name</Card.Header>
                <Card.Body>
                  <Card.Text>{selectedGuide.guideName}</Card.Text>
                </Card.Body>
              </Card>
              </Col>
              {/* Cut off Time Card */}
              <Col md={4}>
  
              <Card className="mb-3">
                <Card.Header>Cut off Time</Card.Header>
                <Card.Body>
                  <Card.Text>
                    {selectedGuide.cutoffTime} hr
                    
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
              <Col md={4}>
  
              {/* Available Days Card */}
              <Card className="mb-3">
                <Card.Header>Available Days</Card.Header>
                <Card.Body>
                 
                    {selectedGuide.availableDays.map((day, index) => (
                      <p key={index}>{day}</p>
                    ))}
                 
                </Card.Body>
              </Card>
              </Col>            </Row>
            {/* Table Card */}
            <Card>
              <Card.Header>Products</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGuide.products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.ProductId}</td>
                        <td>{product.productName}</td>
                        {/* Add more table cells as needed */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
