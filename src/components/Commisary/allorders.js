import React, { useState, useEffect } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import { Card, Dropdown, Table, Button,Container,Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AllOrders() {
  const [allGuides, setAllGuides] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [selectedGuideDetails, setSelectedGuideDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

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

    // Fetch guide details when a guide is selected
    try {
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/getGuideById/${guideId}`
      );
      const data = await response.json();
      setSelectedGuideDetails(data.guide);
    } catch (error) {
      console.error("Error fetching guide details:", error);
    }
  };

  useEffect(() => {
    if (selectedGuideDetails && selectedDate) {
      // Fetch stores based on selected date
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      fetch(
        `http://localhost:8080/getAllStoresOnly`
      )
        .then((response) => response.json())
        .then((data) => setAllStores(data.stores))
        .catch((error) => console.error("Error fetching stores:", error));
    }
  }, [selectedGuideDetails, selectedDate]);

  useEffect(() => {
    const fetchOrdersForStore = async (storeID) => {
      try {
        const formattedDate = selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        // console.log (storeID)

        const response = await fetch(
          "http://localhost:8080/getOrdersForCommisary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ storeID, date: formattedDate }),
          }
        );
        const data = await response.json();
        // console.log(data)

        return { storeID, orders: data.allorders };
      } catch (error) {
        console.error(`Error fetching orders for store ${storeID}:`, error);
        return { storeID, orders: [] };
      }
    };

    const fetchOrdersForAllStores = async () => {
      if (selectedDate && allStores.length > 0) {
        const storeOrdersPromises = allStores.map(async (store) =>
          fetchOrdersForStore(store.storeName)
        );
        const storeOrders = await Promise.all(storeOrdersPromises);
        setSelectedOrders(storeOrders);
      }
    };

    fetchOrdersForAllStores();
  }, [selectedDate, allStores]);
  const handlePrint = () => {
    const printableElement = document.getElementById('printable'); // 'printable' is the ID of the element you want to print

    if (printableElement) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #28a745;
                color: #fff;
              }
              td {
                background-color: #ffc107;
                color: #000;
              }
            </style>
          </head>
          <body>
            ${printableElement.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Printable element not found.');
    }
  };  return (
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
  
    {/* Display guide details and stores in a Bootstrap card */}
    {selectedGuideDetails && (
      <Card className="mt-3" id="printable" >
        <Card.Body>
          <Card.Title style={{ color: '#007BFF' }}>{selectedGuideDetails.guideName}</Card.Title>
  
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#28a745', color: '#fff' }}>Product Name</th>
                {allStores.map((store) => (
                  <th key={store._id} style={{ backgroundColor: '#ffc107', color: '#000' }}>{store.storeName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedGuideDetails.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  {allStores.map((store) => (
                    <td key={store._id}>
                      {selectedOrders
                        .find((order) => order.storeID === store.storeName)
                        ?.orders?.products.find(
                          (orderProduct) =>
                            orderProduct.ProductId === product.ProductId
                        )?.productQuantity || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <button className="btn btn-primary" onClick={handlePrint}> Print </button>

      </Card>
    )}
          </Container>

  </>
  
  );
}

export default AllOrders;
