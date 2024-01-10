// Main page fore ViewOrderss

import React, { useState, useEffect } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import {
  Container,
  Form,
  Button,
  Pagination,  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

function Products() {
  const [procategory, setProcategory] = useState([]);
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    ProductId: "",
    productName: "",
    procategory: "",
  });
  const productsPerPage = 9; // Set the number of products to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
  const fetchAllProducts = async () => {
    try {
      const productsResponse = await fetch(
        "https://apiforshm-production.up.railway.app/getAllProduct"
      );
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setProducts(productsData.product || []);
        console.log(products);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  useEffect(() => {
    fetchproductcate();
    fetchAllProducts();
  }, []);
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
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
        fetchAllProducts();
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      const apiUrl = `https://apiforshm-production.up.railway.app/deleteProduct/${productId}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Product deleted successfully");

        // Refresh the product list after deleting a product
        fetchAllProducts();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  return (
    <>
      <ComNavbar />
      <Container className="mt-4">
      <div className="card mt-3">
      <div className="card-body">
        
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
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
              </Col>
              <Col md={3}>
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
              </Col>
              <Col md={3}>
              <Form.Group controlId=" procategory">
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
                </Col>
              </Row>
              <Row className="d-flex justify-content-end">
               
              <Col md={3} >
              <br />
              <Button type="submit" variant="success">
                Add Product
              </Button>
              </Col>
              </Row>
            </Form>
         
        </div>
      </div>
        <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Product List</h5>

        <Row>
          {currentProducts.map((product) => (
            <Col key={product.ProductId} md={4}className="mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">ID: {product.ProductId}</p>

                  <div className="d-flex justify-content-between align-items-end">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="secondary"
                        id={`dropdown-${product.ProductId}`}
                      >
                        Category
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          Category: {product.procategory.procategoryName}
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Production Team: {product.procategory.productionTeam}
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Packing Team: {product.procategory.packingTeam}
                        </Dropdown.Item>
                        </Dropdown.Menu>

                      </Dropdown>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Pagination>
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      </div>

      </Container>
    </>
  );
}

export default Products;
