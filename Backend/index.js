import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const port=process.env.PORT || 5000;
const app=express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRouter);

app.listen(port,()=>{
    connectDB();
    console.log("server is running on port "+port);
})
// Give me all knowledge about process in nodejs, where it comes from, how it works, and how to use it.
// In Node.js, the `process` object is a global object that provides information about, and control over, the current Node.js process. It is an instance of the EventEmitter class and is available in all Node.js modules without requiring any additional imports. The `process` object allows you to interact with the environment in which your Node.js application is running.