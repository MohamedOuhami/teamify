"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getTeamByLeader } from "../actions/teams/getTeamsByLeader";
import TeamCard from "../components/TeamCard";

const Page = () => {
    const { data: session } = useSession();
    const [teams, setTeams] = useState<any[]>([]); // State to hold teams
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchTeams = async () => {
            if (session?.user?.email) {
                try {
                    const fetchedTeams = await getTeamByLeader(session?.user?.email);

                    // Ensure fetchedTeams is always an array
                    setTeams(Array.isArray(fetchedTeams) ? fetchedTeams : []);

                    console.log("These are the fetched teams", fetchedTeams); // Check structure

                } catch (error) {
                    console.error("Error fetching teams:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [session?.user?.email]);

    if (loading) {
        return <div>Loading...</div>; // Display a loading state
    }

    return (
        <div>
            {teams.length > 0 ? (
                teams.map((team) => (
                    <>
                        <div key={team._id || team.id || Math.random()}>
                            <TeamCard team_id={team._id} team_name={team.name || "Unnamed Team"} team_description={team.description || "No description available"} />
                        </div>
                    </>

                ))
            ) : (
                <p>No teams found</p>
            )}
        </div>
    );
};

export default Page;
