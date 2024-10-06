"use server";
import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/User";

export const getUserDetails = async (id: string) => {
    try {
        await connectDB();
        

        // Find the user by email and ensure to lean the result
        const userFound = await User.findOne({ _id:id }).lean().exec() as UserDocument | null; // Explicitly cast the result

        // Log the _id as a string if the user is found
        if (userFound) {
            console.log(userFound._id.toString()); // Log the user's _id as a string


            const userFoundParsed = {
                ...userFound,
                _id: userFound._id ? userFound._id.toString() : null // Ensure to handle potential undefined
            };

            console.log(userFoundParsed);
            
            return userFoundParsed; // Return the modified teams array
        } else {
            console.log("User not found.");
        }
    } catch (e) {
        console.error("Error fetching team details:", e);
    }
    return []; // Return an empty array if no teams found or an error occurred
};
