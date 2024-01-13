import React, { useState } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import AvailableDaysModal from "./availableDaysModal";
import ProductSelectionModal from "./productselectmodal";
import DraggableTableRow from "./productTable";
function CreateOrderGuide() {
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
      const existingProductIds = new Set(
        prevGuide.products.map((product) => product._id)
      );

      // Filter selected products to include only those with unique IDs
      const uniqueSelectedProducts = selectedProducts.filter(
        (product) => !existingProductIds.has(product._id)
      );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(guide)
    try {
      // Add your logic to handle the form submission
      const response = await fetch("https://apiforshm-production.up.railway.app/addguide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guide),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // Add your logic to handle the form submission response if needed

      // Reset the guide state after successful submission
      setGuide({
        guideName: "",
        products: [],
        availableDays: [],
        cutoffTime: { hours: 0, minutes: 0, period: "AM" },
      });
    } catch (error) {
      console.error("Error submitting guide:", error);
      // Handle the error, show a message, or perform other actions as needed
    }
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
  const moveRow = (dragIndex, hoverIndex) => {
    const draggedRow = guide.products[dragIndex];
    const updatedProducts = [...guide.products];
    updatedProducts.splice(dragIndex, 1);
    updatedProducts.splice(hoverIndex, 0, draggedRow);

    // Update the state with the new order of rows
    setGuide({ ...guide, products: updatedProducts });
  };

  return (
    <>
      <ComNavbar />
      <Container className="mt-4">
        <div className="card mt-3">
          <div className="card-body">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <br />

                  <Form.Group controlId="guideName">
                    <p>Guide Name:</p>
                    <Form.Control
                      type="text"
                      name="guideName"
                      value={guide.guideName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <br />
                <Col md={4}>
                  <Form.Group controlId="availableDays">
                    <br />

                    <p> Available Days :</p>
                    <Button variant="primary" onClick={handleModalShow}>
                      Select Days
                    </Button>
                  </Form.Group>
                </Col>

                <br />
                <br />

                <Col md={4}>
                  <Form.Group>
                    <br />

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
                </Col>
              </Row>
              <br />
              <Button variant="secondary" onClick={handleOpenProductModal}>
                Add Products
              </Button>
              <br />
              <br />
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <div className="card mt-3 ">
                      <div className="card-body">
                        <h5>Added Products</h5>
                        <Table striped hover>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {guide.products.map((product, index) => (
                              <DraggableTableRow
                                key={index}
                                index={index}
                                product={product}
                                handleRemoveProduct={handleRemoveProduct}
                                moveRow={moveRow}
                              />
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <br />
              <div className="container">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-end">
                    <Button type="submit" variant="success">
                      Create Guide
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
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

export default CreateOrderGuide;
