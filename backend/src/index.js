const express = require("express")
const authRouter = require("./routes/auth.route")
const messageRouter = require("./routes/message.route");
const dotenv = require("dotenv");
const { connetDB } = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors")

dotenv.config();
const app = express();

app.use(cookieParser())
app.use(express.json()) 
app.use("/",(req,res,next)=>{
    console.log(req.method,req.url);
    next();
})
app.use(cors({
    origin: "http:localhost:5173",
    credentials: true,
}))

//authentication
app.use("/api/auth",authRouter);
app.use("/api/message",messageRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`RUNNING AT ${PORT}`);
    connetDB();
})