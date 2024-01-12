// Main page for CreateStoreGuides

import React, { useState, useEffect } from "react";
import StoreNavbar from './StoreNavication/storenavi';
import { Modal, Button, Table, Card, Row, Col } from "react-bootstrap";
import ViewModal from "./viewmodal";
import GuideModal from "./guideModal";
function CreateStoreGuide() {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://apiforshm-production.up.railway.app/getAllGuide")
      .then((response) => response.json())
      .then((data) => setGuides(data.guide))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleguide = async (_id) => {
    try {
        // Make GET request to get the guide by ID
        const response = await fetch(
          `https://apiforshm-production.up.railway.app/getGuideById/${_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setSelectedGuide(data.guide);
          setShowGuideModal(true);
        } else {
          console.error("Error fetching guide by ID");
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
        setShowViewModal(true);
      } else {
        console.error("Error fetching guide by ID");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedGuide(null);
  };

  const handleCloseGuideModal = () => {
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
                  <h5 className="card-title">{guide.guideName}</h5>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleView(guide._id)}
                    >
                      View
                    </button>
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

      {/* View Modal */}
      <ViewModal
        show={showViewModal}
        handleClose={handleCloseViewModal}
        selectedGuide={selectedGuide}
      />

      {/* Guide Modal */}
      <GuideModal
        show={showGuideModal}
        handleClose={handleCloseGuideModal}
        selectedGuide={selectedGuide}
      />
    </>
  );
}

export default CreateStoreGuide;