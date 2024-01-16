import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ViewOrderModal = ({ show, handleClose, order }) => {
  const [selectedorder, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://apiforshm-production.up.railway.app/getOrderById/${order._id}`);
        const data = await response.json();
        if (data.status === 'success') {
          setOrder(data.order);
        } else {
          console.error('Error fetching order details');
        }
      } catch (error) {
        console.error('Error fetching order details', error);
      }
    };

    if (show) {
      fetchOrderDetails();
    }
  }, [show, order]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedorder ? (
          <>
            <p>Name: {selectedorder.guideName}</p>
            <p>Placed Date: {selectedorder.orderDate}</p>
            <p>Placed By: {selectedorder.orderOwner}</p>
            <p>Submitted: {selectedorder.submissionDate.day}, {selectedorder.submissionDate.date} at {selectedorder.submissionDate.time}</p>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedorder.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.productQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Add more details as needed */}
          </>
        ) : (
          <p>Loading order details...</p>
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

export default ViewOrderModal;
