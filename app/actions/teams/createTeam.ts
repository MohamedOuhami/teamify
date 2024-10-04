"use server"
import { connectDB } from "@/lib/mongodb"
import Team from "@/models/Team"
import User from "@/models/User"

export const createTeam = async (values:any) => {
    const {name,description,leader_email} = values

    try {
        await connectDB()

        const userFound = await User.findOne({email: leader_email})

        if(userFound){
            const team = new Team({
                name,description,leader:userFound._id,members:[userFound._id]
            })

            const savedTeam = await team.save()
        }
    }
    catch(e){
        console.log(e);
        
    }
}

