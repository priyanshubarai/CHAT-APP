const express = require("express")
const authRouter = require("./routes/auth.route")

const app = express();


app.use("/",(req,res,next)=>{
    console.log(req.method,req.url);
    next();
})

//authentication
app.use("/api/auth",authRouter);

const PORT = 7000;
app.listen(PORT,()=>{
    console.log(`RUNNING AT ${PORT}`);
})