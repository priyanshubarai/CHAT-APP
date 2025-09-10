import mongoose from "mongoose";

export const connetDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected :${conn.connection.host}`)
    }catch(err){console.log("Database connection failed : "+err)}
}