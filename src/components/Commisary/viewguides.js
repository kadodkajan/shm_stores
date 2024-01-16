import React, { useState, useEffect } from "react";
import { Modal, Button, Table,Card,Row,Col } from "react-bootstrap";
import ComNavbar from "./CommisaryNavication/comnavi";

function ViewGuide() {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://apiforshm-production.up.railway.app/getAllGuide")
      .then((response) => response.json())
      .then((data) => setGuides(data.guide))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (_id) => {
    try {
      // Make DELETE request to delete the guide by ID
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/deleteGuideById/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If successful, update the state to remove the deleted guide
        setGuides((prevGuides) =>
          prevGuides.filter((guide) => guide._id !== _id)
        );
        console.log("Guide deleted successfully");
      } else {
        console.error("Error deleting guide");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleView = async (_id) => {
    try {
      // Make GET request to get the guide by ID
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/getGuideById/${_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedGuide(data.guide);
        setShowModal(true);
      } else {
        console.error("Error fetching guide by ID");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGuide(null);
  };

  return (
    <>
      <ComNavbar />
      <div className="container mt-4">
        <div className="row">
          {guides.map((guide) => (
            <div key={guide._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{guide.guideName}</h5>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleView(guide._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(guide._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
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
                  {selectedGuide.cutoffTime}:
                 
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
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default ViewGuide;
