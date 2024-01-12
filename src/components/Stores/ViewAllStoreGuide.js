import React, { useState, useEffect } from "react";
import StoreNavbar from './StoreNavication/storenavi';
import { Modal, Button, Table, Card, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";

function ViewAllStoreGuide() {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the cookie
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userDataFromCookie = JSON.parse(userCookie);
      setUserData(userDataFromCookie);

      // Use the user data to fetch store guides
      fetchStoreGuides(userDataFromCookie);
    } else {
      // Cookie not found, handle accordingly
      console.log("Cookie not found");
    }
  }, []);

  const fetchStoreGuides = (userData) => {
    // Fetch data from the API based on user_location
    if (userData && userData.user_location) {
      fetch(`https://apiforshm-production.up.railway.app/getAllStoreGuides/${userData.user_location}`)
        .then((response) => response.json())
        .then((data) => setGuides(data.storeGuides))
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  const handleDelete = async (_id) => {
    try {
      // Make DELETE request to delete the guide by ID
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/deleteStoreGuideById/${_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers as needed
          },
        }
      );
  
      if (response.ok) {
        // Guide successfully deleted, you may want to update the UI or perform other actions
        console.log('Guide deleted successfully');
        fetchStoreGuides(userData)
        // After deleting, you may want to refetch the updated list of guides
        // Call the function that fetches guides here, e.g., fetchStoreGuides(userData);
      } else {
        console.error('Error deleting guide:', response.statusText);
        // Handle the error, update UI, or show a notification
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleView = async (_id) => {
    try {
      // Make GET request to get the guide by ID
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/getStoreGuideById/${_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedGuide(data.storeGuide);

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
      <StoreNavbar />
      <div className="container mt-4">
        <div className="row">
          {guides?.map((guide) => (
            <div key={guide._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Name: {guide.storeGuideName}</h5>
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
                      Remove
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
                      <th>Par</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGuide.products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.ProductId}</td>
                        <td>{product.productName}</td>
                        <td>{product.productPar}</td>
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

export default ViewAllStoreGuide;
