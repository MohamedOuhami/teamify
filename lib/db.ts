
import mongoose, { Mongoose } from "mongoose";

const MONGOOSE_URI = process.env.MONGOOSE_URI

if (!MONGOOSE_URI) {
    console.error("Please, enter your mongoose URI");
}

interface Cached {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: Cached = (global as any).mongo;

if (!cached) {
    cached = (global as any).mongo = { conn: null, promise: null };
}
// Establish the connection to the database

async function connectToDB(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect(MONGOOSE_URI as string, opts).then((mongoose) => {
            return mongoose
        })

    }


    cached.conn = await cached.promise

    return cached.conn
}

export default connectToDB