import { ObjectId } from "mongodb";
import { UserDocument } from "./User"
import mongoose from "mongoose"
import { model, Schema } from "mongoose"

export interface TeamDocument {
    _id: string | ObjectId,
    name: string,
    description: string,
    members: string[];
    leader: string,
    createdAt: Date
}

const TeamSchema = new Schema<TeamDocument>({
    name: {
        type: String,
        unique: false,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        unique: false,
        required: false
    },
    leader: {
        type: String, // Use ObjectId for the leader reference
        ref: "User", // Reference the User model
        required: true, // Optionally, you can make this required
    },
    members: [{
        type:String,
        ref:"User"
    }]
},
    { timestamps: true }
)

const Team = mongoose.models?.Team || model<TeamDocument>("Team",TeamSchema)
export default Team