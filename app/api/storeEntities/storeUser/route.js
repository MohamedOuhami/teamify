import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import connectToDB from "@/lib/db";
import user from '@/app/models/User'; // Adjust based on your project structure
import { NextResponse } from 'next/server';

const storeUser = async (req, res) => {

    console.log("Entered the Endpoint");

    const { user } = req;

    console.log(user);
    

    // await connectToDB();

    // Log the user data to the server
    // console.log('User data from Auth0:', user);

    //     // Check if the user exists in your database
    //     const existingUser = await User.findOne({ email: user.email });

    //     if (!existingUser) {
    //         // Save the user data you have from Auth0
    //         await User.create({
    //             username: user.nickname || user.email, // or another field from user
    //             email: user.email,
    //             photo: user.picture, // Use the appropriate field for the photo
    //             // Add any other fields you need
    //         });

    //         console.log(User created in the database: ${user.email});
    //     } else {
    //         console.log(User already exists in the database: ${user.email});
    //     }

    //     // Redirect or send a response
    //     res.redirect('/'); // Redirect to a desired route after saving

    return NextResponse.json({ message: 'Yes' }, { status: 200 });
}

export const GET = storeUser
