import React, { useState, useEffect } from 'react';
import ComNavbar from './CommisaryNavication/comnavi';

function ComTeam() {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the API with a POST request to add a team
    try {
      const response = await fetch('https://apiforshm-production.up.railway.app/addTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName }),
      });

      setTeamName('');

      if (response.ok) {
        // Handle success, e.g., show a success message
        alert('Team added successfully');
        // Refresh the list of teams after adding a new team
        fetchTeams();
      } else {
        // Handle errors, e.g., show an error message
        alert('Failed to add team');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleDelete = async (teamId) => {
    // Call the API with a DELETE request to delete a team
    try {
      const response = await fetch(`https://apiforshm-production.up.railway.app/deleteTeam/${teamId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        alert('Team deleted successfully');
        // Refresh the list of teams after deleting a team
        fetchTeams();
      } else {
        // Handle errors, e.g., show an error message
        alert('Failed to delete team');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const fetchTeams = async () => {
    // Call the API with a GET request to fetch all teams
    try {
      const response = await fetch('https://apiforshm-production.up.railway.app/getAllTeam');
      if (response.ok) {
        const data = await response.json();
        // Update the teams state with the fetched data
        setTeams(data.team);
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to fetch teams');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    // Fetch teams when the component mounts
    fetchTeams();
  }, []);

  return (
    <>
      <ComNavbar />
      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            Team Name:
            <input type="text" value={teamName} onChange={handleInputChange} />
          </label>
          <button type="submit">Add Team</button>
        </form>

        <h2>Teams:</h2>
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team.teamName}</td>
                <td>
                  <button onClick={() => handleDelete(team._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ComTeam;
