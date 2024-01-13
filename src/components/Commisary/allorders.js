import React, { useState, useEffect } from 'react';
import ComNavbar from './CommisaryNavication/comnavi';
import { Card, Dropdown, Table } from 'react-bootstrap';

function AllOrders() {
  const [allGuides, setAllGuides] = useState([]);
  const [allStores, setAllStores] = useState([]);

  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [selectedGuideDetails, setSelectedGuideDetails] = useState(null);

  useEffect(() => {
    // Fetch all guides when the component mounts
    fetch('https://apiforshm-production.up.railway.app/getAllGuide')
      .then(response => response.json())
      .then(data => setAllGuides(data.guide))
      .catch(error => console.error('Error fetching guides:', error));
  }, []);

  const handleGuideSelect = async (guideId) => {
    // Fetch guide details when a guide is selected
    try {
      const response = await fetch(`https://apiforshm-production.up.railway.app/getGuideById/${guideId}`);
      const data = await response.json();
      setSelectedGuideDetails(data.guide);
    } catch (error) {
      console.error('Error fetching guide details:', error);
    }
  };

  useEffect(() => {
    if (selectedGuideDetails) {
      fetch('https://apiforshm-production.up.railway.app/getAllStores')
        .then(response => response.json())
        .then(data => setAllStores(data.stores))
        .catch(error => console.error('Error fetching stores:', error));
    }
  }, [selectedGuideDetails]);

  return (
    <>
      <ComNavbar />
      <p>Hello AllOrders</p>

      {/* Select dropdown for guides */}
      <Dropdown onSelect={(selectedGuideId) => handleGuideSelect(selectedGuideId)}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {selectedGuideId ? `Selected Guide: ${selectedGuideId}` : 'Select a Guide'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {allGuides.map(guide => (
            <Dropdown.Item key={guide._id} eventKey={guide._id}>{guide.guideName}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Display guide details in a Bootstrap card */}
      {selectedGuideDetails && (
        <Card>
          <Card.Body>
            <Card.Title>{selectedGuideDetails.guideName}</Card.Title>
            <Card.Text>Cutoff Time: {selectedGuideDetails.cutoffTime.hours}:{selectedGuideDetails.cutoffTime.minutes} {selectedGuideDetails.cutoffTime.period}</Card.Text>
            <Card.Text>Available Days: {selectedGuideDetails.availableDays.join(', ')}</Card.Text>

            <h6>Products:</h6>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  {allStores.map(store => (
                    <th key={store._id}>{store.storeName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedGuideDetails.products.map(product => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    {allStores.map(store => (
                      <td key={store._id}>{/* Add data for each cell based on your requirements */}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default AllOrders;
