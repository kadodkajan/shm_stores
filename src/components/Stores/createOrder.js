


import React, { useState, useEffect } from "react";
import StoreNavbar from './StoreNavication/storenavi';
import { Modal, Button, Table, Card, Row, Col } from "react-bootstrap";
import CreateOrderModal from "./Orders/createorderModal";
import Cookies from "js-cookie";

function CreateOrder() {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [orderDate, setOrderDate] = useState();

  useEffect(() => {
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
}

  const handleguide = async (_id) => {
    try {
        // Make GET request to get the guide by ID
        const response = await fetch(
          `https://apiforshm-production.up.railway.app/getStoreGuideById/${_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setSelectedGuide(data.storeGuide);
          setShowGuideModal(true);
        } else {
          console.error("Error fetching guide by ID");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  

  const handleCloseGuideModal = () => {
    setOrderDate("")
    setShowGuideModal(false);
    // Additional cleanup or reset logic for the handleguide modal
  };

  return (
    <>
      <StoreNavbar />
      <div className="container mt-4">
        <div className="row">
          {guides.map((guide) => (
            <div key={guide._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                  <h5 className="card-title">{guide.storeGuideName}</h5>
                   
                    <button
                      className="btn btn-success"
                      onClick={() => handleguide(guide._id)}
                    >
                      Use This Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     

      {/* Guide Modal */}
      <CreateOrderModal
        show={showGuideModal}
        handleClose={handleCloseGuideModal}
        selectedGuide={selectedGuide}
        setOrderDate ={setOrderDate}
        orderDate={orderDate}

      />
    </>
  );
}

export default CreateOrder;