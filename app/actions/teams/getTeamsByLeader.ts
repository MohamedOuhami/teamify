"use server";
import { connectDB } from "@/lib/mongodb";
import Team, { TeamDocument } from "@/models/Team";
import User, { UserDocument } from "@/models/User";

export const getTeamByLeader = async (email: string) => {
    try {
        await connectDB();

        // Find the user by email and ensure to lean the result
        const userFound = await User.findOne({ email }).lean().exec() as UserDocument | null; // Explicitly cast the result

        // Log the _id as a string if the user is found
        if (userFound) {
            console.log(userFound._id.toString()); // Log the user's _id as a string

            // Fetch teams for this user and cast it to Team[]
            const teams = await Team.find({ leader: userFound._id.toString() })
                .lean()
                .exec() as TeamDocument[];

            // Map over teams and convert _id to a string
            const teamsWithStringIds = teams.map(team => ({
                ...team,
                _id: team._id.toString()  // Convert ObjectId to a string
            }));

            return teamsWithStringIds; // Return the modified teams array
        } else {
            console.log("User not found.");
        }
    } catch (e) {
        console.error("Error fetching teams:", e);
    }
    return []; // Return an empty array if no teams found or an error occurred
};
