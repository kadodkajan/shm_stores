// GuideModal.js
import React, { useState } from "react";
import { Modal, Button, Table, Card, Row, Col, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const GuideModal = ({ show, handleClose, selectedGuide }) => {
  const [productParValues, setProductParValues] = useState({}); // State to store input for product par
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Assume that getUserDataFromCookie is a function to retrieve user data from cookies
  const getUserDataFromCookie = () => {
    return new Promise((resolve, reject) => {
      const userCookie = Cookies.get("user");
  
      if (userCookie) {
        const userDataFromCookie = JSON.parse(userCookie);
        setUserData(userDataFromCookie);
        resolve(userDataFromCookie);
      } else {
        // Cookie not found, handle accordingly
        reject("User data not found in cookie");
      }
    });
  };

  const handleProductParChange = (productId, value) => {
    setProductParValues((prevValues) => ({
      ...prevValues,
      [productId]: value,
    }));
  };

  const handleCreateStoreGuide = async () => {
    try {
      // Wait for getUserDataFromCookie to complete before proceeding
      const userData = await getUserDataFromCookie();
      const user_location = userData.user_location;
  
      const newGuide = {
        ...selectedGuide,
        products: selectedGuide.products.map((product) => ({
          ...product,
          productPar: productParValues[product._id] || 0,
        })),
        user_location: user_location,
      };
  
      // Reset the input values
      setProductParValues({});
  
      // Send the new guide to the server
      const response = await fetch("https://apiforshm-production.up.railway.app/addStoreGuide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuide),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Store guide added successfully");
      } else {
        console.error("Error adding store guide:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding store guide:", error);
    }
  
    handleClose();
  };
  
  
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Guide Details for Handling</Modal.Title>
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
                      {selectedGuide.cutoffTime.hours}:
                      {selectedGuide.cutoffTime.minutes}{' '}
                      {selectedGuide.cutoffTime.period}
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
              </Col>
            </Row>
            {/* Table Card */}
            <Card>
              <Card.Header>Products</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Product Par</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGuide.products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.ProductId}</td>
                        <td>{product.productName}</td>
                        <td>
                          <Form.Control
                            type="number"
                            placeholder="Enter product par"
                            id={`productPar_${product._id}`} // Add a unique id attribute
                            name={`productPar_${product._id}`} // Add a unique name attribute
                            value={productParValues[product._id] || ""}
                            onChange={(e) =>
                              handleProductParChange(product._id, e.target.value)
                            }
                          />
                        </td>
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
        <Button variant="success" onClick={handleCreateStoreGuide}>
          Create Store Guide
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuideModal;
