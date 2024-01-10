// ProductSelectionModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

function ProductSelectionModal({ showModal, handleClose, handleProductSelection }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchProductCategories = async () => {
    try {
      const procategorysResponse = await fetch("https://apiforshm-production.up.railway.app/getAllProcat");
      if (procategorysResponse.ok) {
        const categoriesdata = await procategorysResponse.json();
        setCategories(categoriesdata.procat);
      } else {
        console.error("Failed to fetch product categories");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    // Fetch categories from the API
    fetchProductCategories();
  }, []);

  useEffect(() => {
    // Fetch products based on the selected category
    if (selectedCategory) {
      fetch(`https://apiforshm-production.up.railway.app/getProductbycate/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleProductSelectionChange = (productId) => {
    const selectedProductIds = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(selectedProductIds);
  };

  const handleSaveAndClose = () => {
    // Pass the selected products to the parent component
    const selectedProductsData = products.filter((product) =>
      selectedProducts.includes(product._id)
    );
    // console.log(selectedProductsData)
    handleProductSelection(selectedProductsData);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="categorySelect">
          <Form.Label>Select Category:</Form.Label>
          <Form.Control as="select" onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.procategoryName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
<br/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>Product Name</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                  
                    id={`product-checkbox-${product._id}`}
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleProductSelectionChange(product._id)}
                  />
                </td>
                <td>{product.productName}</td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSaveAndClose} disabled={!selectedCategory}>
Add        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductSelectionModal;
