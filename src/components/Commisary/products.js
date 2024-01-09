// Main page fore ViewOrderss

import React, { useState, useEffect } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";

function Products() {
  const [procategory, setProcategory] = useState([]);

  const [product, setProduct] = useState({
    ProductId: "",
    productName: "",
    procategory: "",
  });

  const fetchproductcate = async () => {
    try {
      const procategorysResponse = await fetch(
        "https://apiforshm-production.up.railway.app/getAllProcat"
      );
      if (procategorysResponse.ok) {
        const categoriesdata = await procategorysResponse.json();
        setProcategory(categoriesdata.procat);
      } else {
        console.error("Failed to fetch product categories");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  useEffect(() => {
    fetchproductcate();
  }, []);
  const handleInputChange = async (e) => {const { name, value } = e.target;
  setProduct((prev) => ({ ...prev, [name]: value }));};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your API endpoint for adding a product
      const apiUrl = "https://apiforshm-production.up.railway.app/addproduct";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Product added successfully");
        // You can reset the form or update the UI as needed
        setProduct({
          ProductId: "",
          productName: "",
          procategory: "",
        });
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <>
      <ComNavbar />
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="ProductId">
                <Form.Label>Product ID:</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductId"
                  value={product.ProductId}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group
                controlId=" procategory"  >
                <Form.Label>Product Category:</Form.Label>
                <Form.Control
                  as="select"
                  name="procategory"
                  value={product.procategory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a Category</option>
                  {procategory.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.procategoryName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
<br/>
              <Button type="submit" variant="success">
                Add Product 
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Products;
