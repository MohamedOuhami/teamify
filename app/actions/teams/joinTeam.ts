"use server";
import { connectDB } from "@/lib/mongodb";
import Team, { TeamDocument } from "@/models/Team"; // Ensure TeamDocument is imported
import User, { UserDocument } from "@/models/User";
import mongoose, { ObjectId } from "mongoose"; // Import mongoose for ObjectId

export const joinTeam = async (email: string, team_id: string) => {
    try {
        await connectDB();

        // Find the user by email and ensure to lean the result
        const userFound = await User.findOne({ email }).lean().exec() as UserDocument | null;

        // Log the _id as a string if the user is found
        if (userFound) {
            console.log(userFound._id.toString()); // Log the user's _id as a string
            
            // Fetch the team for this user
            const team = await Team.findOne({ _id: team_id }).lean().exec() as TeamDocument | null; // Cast to TeamDocument

            if (team) {

                // Ensure team.members is an array and that userFound._id is included correctly

                console.log(team.members.includes(userFound._id.toString()));
                console.log(team.members);
                console.log(userFound._id.toString());
                
                if (!team.members.includes(userFound._id.toString())) { 
                    // Directly push the user's _id into the members array
                    team.members.push(userFound._id);

                    // Update the team in the database
                    await Team.updateOne({ _id: team_id }, { $set: { members: team.members } });
                    console.log(`User ${userFound._id} added to team ${team.name}.`);
                } else {
                    console.log("The member is already in the team.");
                }
            } else {
                console.log("Team not found.");
            }
        } else {
            console.log("User not found.");
        }
    } catch (e) {
        console.error("Error fetching teams:", e);
    }
    return []; // Return an empty array if no teams found or an error occurred
};
