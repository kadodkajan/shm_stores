// GuideModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Card, Row, Col, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateOrderModal = ({
  show,
  handleClose,
  selectedGuide,
  setOrderDate,
  orderDate,
}) => {
  const [productQuantity, setProductQuantity] = useState({}); // State to store input for product par
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [excludedDates, setExcludedDates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apiforshm-production.up.railway.app/getFutureOrderDates",
          {
            method: "POST", // or "GET" depending on your server implementation
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              guideID: selectedGuide.guideID,
              orderLocation: selectedGuide.user_location,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setExcludedDates(data.futureOrderDates);
        } else {
          console.error(
            "Error fetching future order dates:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching future order dates:", error);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show, selectedGuide]);

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

  const handleProductQuantityChange = (productId, value) => {
    setProductQuantity((prevValues) => ({
      ...prevValues,
      [productId]: value,
    }));
  };

  const handleCreateOrder = async () => {
    try {
      if (!orderDate) {
        alert("Please select a date."); // Show an alert or handle validation as needed
        return;
      }
      // Wait for getUserDataFromCookie to complete before proceeding
      const userData = await getUserDataFromCookie();
      const user_location = userData.user_location;

      const { guideID } = selectedGuide;
      const { guideName } = selectedGuide;
      const products = selectedGuide.products.map((product) => ({
        productName: product.productName,
        ProductId:product.ProductId,
        productQuantity: productQuantity[product._id] ?? 0,
        lastupdate: undefined,
      }));
      const currentDateAndTime = new Date();
      const submissionDate = {
        day: currentDateAndTime.toLocaleDateString("en-US", {
          weekday: "long",
        }),
        date: currentDateAndTime.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        time: currentDateAndTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        }),
      };
      const orderdate = orderDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      const orderOwner = userData.user_name;
      const orderLocation = userData.user_location;
      const newOrder = {
        guideID,
        guideName,
        orderLocation,
        submissionDate,
        orderOwner,
        products,
        orderdate,
      };

      //   console.log(newObject); // Reset the input values
      setProductQuantity({});

      const response = await fetch("https://apiforshm-production.up.railway.app/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
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
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 10); // Set maximum date to 10 days in the future
  const handleDateChange = (date) => {
    setOrderDate(date);
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Place Order</Modal.Title>
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
            </Row>
            {/* Date Picker */}
            <Row>
              <Col md={4}>
                <Card className="mb-3">
                  <Card.Header>Order Date</Card.Header>
                  <Card.Body>
                    <DatePicker
                      selected={orderDate}
                      onChange={handleDateChange}
                      dateFormat="MMMM d, yyyy"
                      minDate={new Date()} // Set minimum date to today
                      maxDate={maxDate}
                      className="form-control"
                      filterDate={(date) => {
                        const formattedDate = date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        });
                        // Exclude dates that match the excludedDates array
                        return !excludedDates.includes(formattedDate);
                      }}
                      required
                    />
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
                      <th>Product Name</th>
                      <th>Par</th>
                      <th>Product Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGuide.products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.productName}</td>
                        <td>{product.productPar}</td>
                        <td>
                          <Form.Control
                            type="number"
                            placeholder="Quantity"
                            id={`productPar_${product._id}`} // Add a unique id attribute
                            name={`productPar_${product._id}`} // Add a unique name attribute
                            value={productQuantity[product._id] || ""}
                            onChange={(e) =>
                              handleProductQuantityChange(
                                product._id,
                                e.target.value
                              )
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
        <Button variant="success" onClick={handleCreateOrder}>
          Create Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateOrderModal;
