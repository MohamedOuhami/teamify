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
        <div className="flex flex-col items-start justify-start min-h-screen p-4">
            <div className="flex flex-wrap justify-start gap-4 w-full">
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <div key={Math.random()} className="w-1/3"> {/* Fixed to 1/3 width for all screens */}
                            <TeamCard 
                                team_id={team._id.toString()} 
                                team_name={team.name || "Unnamed Team"} 
                                team_description={team.description || "No description available"} 
                            />
                        </div>
                    ))
                ) : (
                    <p>No teams found</p>
                )}
            </div>
        </div>
    );
};

export default Page;
