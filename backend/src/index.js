import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import dotenv from "dotenv";
import { connetDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";   // needed after deploy
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

// Middleware setup
app.use(express.json({ limit: '10mb' }));  // allow up to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? process.env.FRONTEND_URL || "https://your-frontend-domain.com"
        : "http://localhost:5173",
    credentials: true,
}))

// Logging middleware
app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
})

// API routes
app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);

// Static file serving and catch-all for production
const __dirname = path.dirname(__filename);    
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));

    // Catch-all handler: send back React's index.html file for any non-API routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

const PORT = process.env.PORT || 7000;
server.listen(PORT,()=>{
    console.log(`RUNNING AT ${PORT}`);
    connetDB();
})

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});