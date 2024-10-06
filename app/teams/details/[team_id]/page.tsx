"use client";
import { useEffect, useState } from 'react';
import { getTeamDetails } from '@/app/actions/teams/getTeamDetails';
import { useParams } from 'next/navigation';

const TeamDetailsPage = () => {
  const params = useParams();
  const teamId = params?.team_id as string; // Ensure teamId is a string

  // State to hold the team data
  const [team, setTeam] = useState(null); 
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTeamDetails = async () => {
      setLoading(true); // Set loading state to true while fetching
      try {
        const teamData = await getTeamDetails(teamId); 
        setTeam(teamData as any)
      } catch (error) {
        console.error("Failed to fetch team details:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    if (teamId) {
      fetchTeamDetails(); // Fetch team details if teamId is available
    }
  }, [teamId]); // Dependency array

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  if (!team) {
    return <p>No team details available.</p>; // Handle case where team data is not available
  }

  const { name, description, leader, members } = team; // Destructure team properties

  return (
    <div>
      <h1>Team Details for ID: {teamId}</h1>
      <p>Team Name: {name}</p>
      <p>Team Description: {description}</p>
      <p>Team Leader: {leader.name}</p>
      <p>Team Members:</p>
      {members.length > 0 ? (
        members.map((member) => (
          <div key={member._id}>{member.name}</div> // Add a unique key for each member
        ))
      ) : (
        <p>No members found.</p>
      )}
      {/* Optional: Uncomment this if you want to use a TeamCard component
      <TeamCard
        name={name}
        description={description}
        creationDate={team.creationDate}
        leader={leader}
      /> */}
    </div>
  );
};

export default TeamDetailsPage;