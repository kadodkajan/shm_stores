// ViewOrders.js
import React, { useState, useEffect } from 'react';
import StoreNavbar from './StoreNavication/storenavi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import ViewOrderModal from './Orders/vieworderModal';
import { Button } from 'react-bootstrap';

function ViewOrders() {
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [temp, settemp] = useState();


  const fetchOrders = async (userData) => {
    try {
      const response = await fetch('https://apiforshm-production.up.railway.app/getOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeID:userData.user_location, 
          date: selectedDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.orders);
      } else {
        console.error('Error fetching orders');
      }
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userDataFromCookie = JSON.parse(userCookie);
      setUserData(userDataFromCookie);

      // Use the user data to fetch store guides
      fetchOrders(userDataFromCookie);
    } else {
      // Cookie not found, handle accordingly
      console.log("Cookie not found");
    }
        
  }, [selectedDate, temp]); // Trigger fetchOrders when the selected date changes

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const handleUpdateClick = (order) => {
    alert("Feature Not Avilable now")
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleDelete = async (order) => {
    try {
      const response = await fetch(`https://apiforshm-production.up.railway.app/deleteOrderById/${order._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.status === 'success') {
        settemp("") ;
         } else {
        console.error('Error deleting order:', data.message);
      }
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };
  return (
    <>
      <StoreNavbar />
      <div className="container mt-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control mb-4"
          dateFormat="dd/MM/yyyy"
        />
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">Order Name: {order.guideName}</p>
                  <p className="card-text">
                    Order For: {new Date(order.orderdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="card-text">Order By: {order.orderOwner}</p>
                  <div className="btn-group">
                    <Button variant="info" onClick={() => handleViewClick(order)}>
                      View
                    </Button>
                    <button className="btn btn-warning" onClick={() => handleUpdateClick(order)}>Update</button>
                    <Button variant="danger" onClick={() => handleDelete(order)}>
          Delete
        </Button>                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Modal */}
      {selectedOrder && (
        <ViewOrderModal show={showModal} handleClose={handleCloseModal} order={selectedOrder} />
      )}
    </>
  );
}

export default ViewOrders;
