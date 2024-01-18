import React, { useState, useEffect } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import {
  Modal,
  Container,
  Form,
  Row,
  Col,
  Dropdown,
  Button,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {handlePrint} from "./printorders";

function AllOrders() {
  const [allGuides, setAllGuides] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  useEffect(() => {
    // Fetch all guides when the component mounts
    fetch("https://apiforshm-production.up.railway.app/getAllGuide")
      .then((response) => response.json())
      .then((data) => setAllGuides(data.guide))
      .catch((error) => console.error("Error fetching guides:", error));
  }, []);

  const handleGuideSelect = async (guideId) => {
    // Check if date is selected before allowing guide selection
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }
    const formattedDate = selectedDate.toLocaleDateString("en-US");

    // Fetch data from the API using selected guide and date
    try {
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/getOrdersForCommisary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ guideID: guideId, date: formattedDate }),
        }
      );
      const data = await response.json();
      if (data.message) {
        // Show the modal with the message
        setShowModal(true);
        setModalMessage(data.message);
      }
      const temp = data.data;
      setOrderData(temp);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const getProductQuantity = (order, productId) => {
    const product = order.products.find((p) => p.ProductId === productId);
    return product.productQuantity != -1 ? product.productQuantity : null;
  };

  const handlePrintButtonClick = () => {
    handlePrint(orderData);
  };

  
  return (
    <>
      <ComNavbar />
      <Container className="mt-4">
        {/* Date picker for selecting a date */}
        <div className="mb-3">
          <Form.Group as={Row} controlId="formDate">
            <Form.Label column sm="2">
              Select Date:
            </Form.Label>
            <Col sm="10">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control"
              />
            </Col>
          </Form.Group>
        </div>

        {/* Select dropdown for guides */}
        <Dropdown
          onSelect={(selectedGuideId) => handleGuideSelect(selectedGuideId)}
          disabled={!selectedDate}
        >
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {selectedGuideId
              ? `Selected Guide: ${selectedGuideId}`
              : "Select a Guide"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {allGuides.map((guide) => (
              <Dropdown.Item
                key={guide._id}
                eventKey={guide._id}
                disabled={!selectedDate}
              >
                {guide.guideName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        {/* Display order details in a table */}
        {orderData && orderData.storeOrders && (
                  <div className="table-responsive">

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product ID</th>
                {orderData.storeOrders.map((order) => (
                  <th key={order.storeName}>{order.storeName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orderData.allproducts.map((product) => (
                <tr key={product.ProductId}>
                  <td>{product.productName}</td>
                  <td>{product.ProductId}</td>
                  {orderData.storeOrders.map((order) => (
                    <td key={`${order.storeName}_${product.ProductId}`}>
                      {getProductQuantity(order, product.ProductId)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        )}
       <Button variant="primary" onClick={handlePrintButtonClick}>
          Print
        </Button>
      </Container>
      
      {/* Modal to display the message */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <p>Orders Placed By</p>
          {modalMessage?.details && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Stores</th>
                  <th>System </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{modalMessage.details.stores.join(", ")}</td>
                  <td>{modalMessage.details.systemorder.join(", ")}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default AllOrders;
