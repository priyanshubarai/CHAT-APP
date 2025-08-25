const express = require("express")

const app = express();

app.use("/",(req,res,next)=>{
    console.log(req.url,req.method);
    next();
})

const PORT = 7000;
app.listen(PORT,()=>{
    console.log(`RUNNING AT ${PORT}`);
})