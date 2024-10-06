"use server";
import { connectDB } from "@/lib/mongodb";
import Team, { TeamDocument } from "@/models/Team";
import { getUserDetails } from "./getUserDetails";

export const getTeamDetails = async (id: string) => {
    try {
        await connectDB();

        const teamFound = await Team.findOne({ _id: id }).lean().exec() as TeamDocument | null;

        if (teamFound) {
            const teamFoundParsed = {
                ...teamFound,
                _id: teamFound._id ? teamFound._id.toString() : null,
                leader: await getUserDetails(teamFound.leader),
                members: await Promise.all(
                    teamFound.members.map(async (member) => {
                        const userDetails = await getUserDetails(member);
                        return userDetails; // Return the resolved user details
                    })
                )
            };

            console.log(teamFoundParsed);
            return teamFoundParsed; // Return the modified team object
        } else {
            console.log("Team not found.");
        }
    } catch (e) {
        console.error("Error fetching team details:", e);
    }
    return null; // Return null if no team found or an error occurred
};
