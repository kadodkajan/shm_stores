import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Cookies from "js-cookie";

function StoreNavbar() {
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  useEffect(() => {
    // Function to retrieve user data from the cookie
    const getUserDataFromCookie = () => {
      const userCookie = Cookies.get("user");

      if (userCookie) {
        const userDataFromCookie = JSON.parse(userCookie);
        setUserData(userDataFromCookie);
      } else {
        // Cookie not found, handle accordingly
        navigate("/"); // Redirect to login page or handle as needed
      }
    };
    getUserDataFromCookie();
  }, [navigate]);
  const handleLogout = () => {
    // Clear the user cookie
    Cookies.remove("user");
    // Redirect to the login page
    navigate("/");
  };
  return (
    
    <Navbar
      expand="lg"
      collapseOnSelect
      className="bg-body-tertiary"
      data-bs-theme="dark"
    >
      <Container fluid>
      <div>
          <Navbar.Brand href="#">{userData?.user_location}</Navbar.Brand>
          <br />
          <Navbar.Brand href="#">{userData?.user_name}</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand"
          aria-labelledby="offcanvasNavbarLabel-expand sm "
          placement="end"
          className="custom-offcanvas"
          data-bs-theme="dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="custom-offcanvas-body ">
            <Nav className="justify-content-flex-start pe-1 " id="cstom-nav">
              <Nav.Link href="/stores">Home</Nav.Link>
              <NavDropdown title="Order Guides" id="offcanvasNavbarDropdown-expand">
                <NavDropdown.Item href="/stores/createstoreguide">
                  Create Order Guide
                </NavDropdown.Item>
                <NavDropdown.Item href="/stores/viewallstoreguide">
                  View Order Guides
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Orders" id="offcanvasNavbarDropdown-expand">
                <NavDropdown.Item href="/stores/createorder">
                  Create Order
                </NavDropdown.Item>
                <NavDropdown.Item href="/stores/vieworders">
                  View Orders
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>


            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default StoreNavbar;
