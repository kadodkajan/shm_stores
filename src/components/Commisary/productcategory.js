import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";
import ComNavbar from "./CommisaryNavication/comnavi";

function ProductCategory() {
  const [teams, setTeams] = useState([]);
  const [procategory, setProcategory] = useState({
    procategoryName: "",
    productionTeam: "",
    packingTeam: "",
  });
  const [categories, setCategories] = useState([]);

  const fetchFuction = async () => {
    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/getAllTeam"
      );
      const procategorysResponse = await fetch(
        "https://apiforshm-production.up.railway.app/getAllProcat"
      );
      if (response.ok) {
        const data = await response.json();
        setTeams(data.team);
      } else {
        console.error("Failed to fetch teams");
      }
      if (procategorysResponse.ok) {
        const categoriesdata = await procategorysResponse.json();
        setCategories(categoriesdata.procat);
      } else {
        console.error("Failed to fetch product categories");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchFuction();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProcategory((prevcat) => ({ ...prevcat, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/addprocate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ procategory }),
        }
      );
      setProcategory({
        procategoryName: "",
        productionTeam: "",
        packingTeam: "",
      });
      if (response.ok) {
        // Handle success, e.g., show a success message
        alert("Product category added successfully");
        // Refresh the list of product categories after adding a new one
        fetchFuction();
      } else {
        // Handle errors, e.g., show an error message
        alert("Failed to add product category");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/deleteprocate/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message
        alert("Product category deleted successfully");
        // Refresh the list of product categories after deleting one
        fetchFuction();
      } else {
        // Handle errors, e.g., show an error message
        alert("Failed to delete product category");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <ComNavbar />
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="procategoryName">
                <Form.Label>Product Category Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="procategoryName"
                  value={procategory.procategoryName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="productionTeam">
                <Form.Label>Production Team:</Form.Label>
                <Form.Control
                  as="select"
                  name="productionTeam"
                  value={procategory.productionTeam}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a Team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="packingTeam">
                <Form.Label>Packing Team:</Form.Label>
                <Form.Control
                  as="select"
                  name="packingTeam"
                  value={procategory.packingTeam}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a Team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button type="submit" variant="success">
                Add Product Category
              </Button>
            </Form>
          </Col>
        </Row>

        <Table hover style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Product Category</th>
              <th>Production</th>
              <th>Packaging</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.procategoryName}</td>
                <td>{category.productionTeam}</td>
                <td>{category.packingTeam}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(category._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ProductCategory;
