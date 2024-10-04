"use server";
import { connectDB } from "@/lib/mongodb";
import Team from "@/models/Team";
import User, { UserDocument } from "@/models/User";

export const getTeamByLeader = async (email: string)=> {
    try {
        await connectDB();

        // Find the user by email and ensure to lean the result
        const userFound = await User.findOne({ email }).lean().exec() as UserDocument | null; // Explicitly cast the result

        // Log the _id as a string if the user is found
        if (userFound) {
            console.log(userFound._id.toString()); // Log the user's _id as a string
            
            // Fetch teams for this user
            const teams = await Team.find({ leader: userFound._id }).lean().exec();

            // Map over teams and return the _id of each team as a string
            return teams
        } else {
            console.log("User not found.");
        }
    } catch (e) {
        console.error("Error fetching teams:", e);
    }
    return []; // Return an empty array if no teams found or an error occurred
};
