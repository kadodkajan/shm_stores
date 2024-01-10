import React, { useState, useEffect } from "react";
import ComNavbar from "./CommisaryNavication/comnavi";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";

function ComTeam() {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the API with a POST request to add a team
    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/addTeam",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamName }),
        }
      );

      setTeamName("");

      if (response.ok) {
        // Handle success, e.g., show a success message
        alert("Team added successfully");
        // Refresh the list of teams after adding a new team
        fetchTeams();
      } else {
        // Handle errors, e.g., show an error message
        alert("Failed to add team");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDelete = async (teamId) => {
    // Call the API with a DELETE request to delete a team
    try {
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/deleteTeam/${teamId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message
        alert("Team deleted successfully");
        // Refresh the list of teams after deleting a team
        fetchTeams();
      } else {
        // Handle errors, e.g., show an error message
        alert("Failed to delete team");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchTeams = async () => {
    // Call the API with a GET request to fetch all teams
    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/getAllTeam"
      );
      if (response.ok) {
        const data = await response.json();
        // Update the teams state with the fetched data
        setTeams(data.team);
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to fetch teams");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    // Fetch teams when the component mounts
    fetchTeams();
  }, []);

  return (
    <>
      <ComNavbar />
      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={5}>
              <Form.Group controlId="teamName">
                <Form.Label>Team Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={teamName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />
          <Button variant="success" type="submit">
            Add Team
          </Button>
        </Form>

        <br />
        <h5 >Team List</h5>       
        <Table hover style={{ width: "350px" }}>
          <thead>
            <tr>
              <th>Team Name</th>

              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team.teamName}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(team._id)}
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

export default ComTeam;
