import React, { useState } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import AvailableDaysModal from "./availableDaysModal";
import ProductSelectionModal from "./productselectmodal";
function OrderGuide() {
  const [guide, setGuide] = useState({
    guideName: "",
    products: [],
    availableDays: [],
    cutoffTime: { hours: 0, minutes: 0, period: "AM" },
  });

  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelection = (selectedProducts) => {
    setGuide((prevGuide) => {
      // Create a Set of existing product IDs
      const existingProductIds = new Set(prevGuide.products.map(product => product._id));
  
      // Filter selected products to include only those with unique IDs
      const uniqueSelectedProducts = selectedProducts.filter(product => !existingProductIds.has(product._id));
  
      return {
        ...prevGuide,
        products: [...prevGuide.products, ...uniqueSelectedProducts],
      };
    });
  };
  
  
  const handleOpenProductModal = () => {
    setShowProductModal(true);
  };
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

    console.log(guide);

    // Add your logic to handle the form submission
    setGuide({
      guideName: "",
      products: [],
      availableDays: [],
      cutoffTime: { hours: 0, minutes: 0, period: "AM" },
    });
    // window.location.reload();
  };
  const handleRemoveProduct = (index) => {
    setGuide((prevGuide) => {
      const updatedProducts = [...prevGuide.products];
      updatedProducts.splice(index, 1);
      return {
        ...prevGuide,
        products: updatedProducts,
      };
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
                  <Button variant="primary" onClick={handleOpenProductModal}>
                    Add Products
                  </Button>
                  <br/>
                  <br/>

                  <Form.Group>
                    <p>Selected Products:</p>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guide.products.map((product, index) => (
                          <tr key={index}>
                            <td>{product.productName}</td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() => handleRemoveProduct(index)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Form.Group>
                 
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
      <AvailableDaysModal
        showModal={showModal}
        handleClose={handleModalClose}
        handleSaveChanges={handleAvailableDaysChange} // Assuming this is the correct handler
        guide={guide}
      />
      <ProductSelectionModal
        showModal={showProductModal}
        handleClose={() => setShowProductModal(false)}
        handleProductSelection={handleProductSelection}
      />
    </>
  );
}

export default OrderGuide;
