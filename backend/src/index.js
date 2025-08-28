const express = require("express")
const authRouter = require("./routes/auth.route")
const messageRouter = require("./routes/message.route");
const dotenv = require("dotenv");
const { connetDB } = require("./lib/db");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(cookieParser())
app.use(express.json()) 
app.use("/",(req,res,next)=>{
    console.log(req.method,req.url);
    next();
})

//authentication
app.use("/api/auth",authRouter);
app.use("/api/message",messageRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`RUNNING AT ${PORT}`);
    connetDB();
})