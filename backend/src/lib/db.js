const moongoose = require("mongoose")

exports.connetDB = async () => {
    try{
        const conn = await moongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected :${conn.connection.host}`)
    }catch(err){console.log("Database connection failed : "+err)}
}