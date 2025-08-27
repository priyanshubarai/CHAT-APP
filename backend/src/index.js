const express = require("express")
const authRouter = require("./routes/auth.route")
const dotenv = require("dotenv");
const { connetDB } = require("./lib/db");

dotenv.config();
const app = express();

app.use("/",(req,res,next)=>{
    console.log(req.method,req.url);
    next();
})

app.use(express.json()) 
//authentication
app.use("/api/auth",authRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`RUNNING AT ${PORT}`);
    connetDB();
})